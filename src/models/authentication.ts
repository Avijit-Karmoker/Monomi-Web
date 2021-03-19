import { createModel } from '@rematch/core'

import { AuthenticationPayload, PinPayload, AuthMeta } from '@/typings'
import API from '@/utils/API'
import ErrorReporting from '@/utils/ErrorReporting'
import { RootModel } from '.'
import { modelConfig } from '@monomi/rematch'

export default createModel<RootModel>()({
  ...modelConfig.authentication,
  effects: (dispatch) => ({
    async authenticate(payload: AuthenticationPayload) {
      try {
        const {
          data,
          meta: { auth },
        } = await dispatch.user.createUser(payload)

        dispatch.authentication.setUser(data)
        dispatch.authentication.setRefreshToken(auth.refreshToken)
        dispatch.authentication.setToken(auth.token)
      } catch (error) {
        if (error.status === 409) {
          dispatch.authentication.changeUser(payload)
        }

        throw error
      }
    },
    async logout() {
      API.delete('auth/logout', {})

      ErrorReporting.setUser(null)

      dispatch.authentication.reset()
    },
    async login({ pin }: PinPayload, state) {
      const { user } = state.authentication
      const { device } = state.global

      const payload = {
        pin,
        email: user!.email,
        device,
      }

      const {
        data: { auth },
      } = await API.post<AuthMeta>('auth/login', payload, {
        fetchRefreshToken: false,
      })

      dispatch.authentication.setRefreshToken(auth.refreshToken)
      dispatch.authentication.setToken(auth.token)
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
        const { data } = await API.post<AuthMeta>('auth/refresh', payload, {
          fetchRefreshToken: false,
        })

        dispatch.authentication.setToken(data.auth.token)
      } catch (error) {
        if (error.status === 401) {
          dispatch.authentication.setRefreshToken(null)
        }

        throw error
      }
    },
  }),
})
