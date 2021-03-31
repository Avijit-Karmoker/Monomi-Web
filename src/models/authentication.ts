import { createModel } from '@rematch/core'
import {
  AuthenticationPayload,
  PinPayload,
  AuthMeta,
  AuthRefreshMeta,
} from '@/typings'
import API from '@/utils/API'
import ErrorReporting from '@/utils/ErrorReporting'
import { RootModel } from '.'
import { modelConfig } from '@monomi/rematch'
import { signIn, signOut } from 'next-auth/client'

export default createModel<RootModel>()({
  ...modelConfig.authentication,
  effects: (dispatch) => ({
    async authenticate(payload: AuthenticationPayload) {
      const {
        setUser,
        createSession,
        changeUser,
        deleteSession,
      } = dispatch.authentication

      try {
        const { data, meta } = await dispatch.user.createUser(payload)

        setUser(data)

        createSession(meta)
      } catch (error) {
        if (error.status === 409) {
          deleteSession()

          changeUser(payload)
        }

        throw error
      }
    },
    async logout() {
      API.delete('auth/logout', {})

      ErrorReporting.setUser(null)

      dispatch.authentication.deleteSession()
    },
    async login({ pin }: PinPayload, state) {
      const { user } = state.authentication
      const { device } = state.global

      const payload = {
        pin,
        email: user!.email,
        device,
      }

      const { data } = await API.post<AuthMeta>('auth/login', payload, {
        fetchRefreshToken: false,
      })

      dispatch.authentication.createSession(data)
    },
    async fetchToken(_, state) {
      dispatch.authentication.setToken(null)

      const { user, refreshToken } = state.authentication
      const { device } = state.global

      const payload = {
        userId: user!.id,
        refreshToken,
        device,
      }

      try {
        const { data } = await API.post<AuthRefreshMeta>(
          'auth/refresh',
          payload,
          {
            fetchRefreshToken: false,
          },
        )

        dispatch.authentication.createSession(data)
      } catch (error) {
        if (error.status === 401) {
          dispatch.authentication.deleteSession()
        }

        throw error
      }
    },
    async createSession({ auth }: AuthMeta | AuthRefreshMeta) {
      const { token } = auth
      dispatch.authentication.setToken(auth.token)

      if ('refreshToken' in auth) {
        dispatch.authentication.setRefreshToken(auth.refreshToken)
      }

      return signIn('credentials', {
        accessToken: token,
        redirect: false,
      })
    },
    async deleteSession() {
      dispatch.authentication.reset()

      return signOut({ redirect: false })
    },
  }),
})
