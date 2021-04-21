import { Deserializer } from 'jsonapi-serializer'
import store from '../store'
import { baseUrl } from '@/config'
import {
  APIErrorResponse,
  APIOptions,
  APIRequest,
  APIResponse,
} from '@/typings'
import { i18n } from 'next-i18next'

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' })

const logging = process.env.NODE_ENV === 'development'

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

function requestHeaders() {
  const { authentication, global } = store!.getState()
  const { token } = authentication

  const headers = new Headers({
    ...defaultHeaders,
    'Accept-Language': global.locale,
  })

  if (token) {
    headers.append('Authorization', `Bearer ${token}`)
  }

  return headers
}

async function handleResponse<Data, Meta>(response: Response) {
  const { status } = response

  let json, parseError

  try {
    json = await response.json()
  } catch (error) {
    parseError = error
  }

  if (logging) {
    console.log('API response', response.url, {
      status,
      body: json,
      parseError,
      requestId: response.headers.get('X-Request-Id'),
    })
  }

  if (status >= 200 && status < 400) {
    if (!json || !json.data) {
      return json || ({} as APIResponse<Data, Meta>)
    } else {
      const data = await deserializer.deserialize(json)

      return {
        data: Object.keys(data).length ? data : json.data,
        meta: json.meta,
      } as APIResponse<Data, Meta>
    }
  }

  if (json) {
    const { errors } = json

    if (errors) {
      throw { errors, status } as APIErrorResponse
    } else {
      throw { ...json, status }
    }
  } else {
    throw { parseError, status }
  }
}

async function handleRequest<Response, Meta>(
  method: string,
  path: string,
  payload?: any,
  options: APIOptions = { fetchRefreshToken: true },
): Promise<APIResponse<Response, Meta>> {
  const headers = requestHeaders()
  const requestOptions: RequestInit = { method, headers }

  let queryParams = ''

  if (payload) {
    if (method === 'GET') {
      queryParams = `?${new URLSearchParams(payload)}`
    } else {
      if (payload instanceof FormData) {
        requestOptions.body = payload
      } else {
        requestOptions.body = JSON.stringify(payload)
      }
    }
  }

  const url = `${baseUrl}/${path}${queryParams}`

  if (logging) {
    console.log('API request', url, requestOptions)
  }

  try {
    const response = await fetch(url, requestOptions)

    return await handleResponse<Response, Meta>(response)
  } catch (error) {
    const serviceUnavailable = !error.status
    const { getState, dispatch } = store!
    const { authentication, ui } = dispatch

    if (serviceUnavailable || error.status >= 500) {
      const t = i18n?.getFixedT(i18n.language, 'common')!

      ui.addToast({
        title: serviceUnavailable ? t('serviceUnavailable') : t('serverError'),
        message: `${t('code')}: ${error.status || error.message}`,
        type: 'error',
      })
    } else if (error.status === 429) {
      const [{ title, detail }] = (error as APIErrorResponse).errors

      ui.addToast({
        title,
        message: detail,
        type: 'error',
      })
    } else if (error.status === 401 && options.fetchRefreshToken) {
      if (getState().authentication.refreshToken) {
        try {
          await authentication.fetchToken()

          return handleRequest<Response, Meta>(method, path, payload)
        } catch (error) {
          throw error
        }
      }
    }

    if (logging) {
      console.log('API request failed', url, error)
    }

    throw error
  }
}

function buildAPIMethod(method: string): APIRequest {
  return <Response = void, Meta = void>(...args: Parameters<APIRequest>) =>
    handleRequest<Response, Meta>(method, ...args)
}

const API = {
  initialListMeta: {
    count: 0,
    total: 0,
    page: { size: 20, number: 1 },
  },
  get: buildAPIMethod('GET'),
  post: buildAPIMethod('POST'),
  patch: buildAPIMethod('PATCH'),
  put: buildAPIMethod('PUT'),
  delete: buildAPIMethod('DELETE'),
}

export default API
