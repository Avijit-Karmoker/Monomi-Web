import { createModel } from '@rematch/core'
import API from '@/utils/API'
import ErrorReporting from '@/utils/ErrorReporting'
import { RootModel } from '.'
import {
  AuthenticationPayload,
  AuthMeta,
  UpdateUserPayload,
  User,
} from '@/typings'
import { getChanges } from '@/utils'

export default createModel<RootModel>()({
  state: {},
  reducers: {},
  effects: (dispatch) => ({
    async createUser({ email }: AuthenticationPayload, state) {
      const { device, locale: localization } = state.global
      const payload = {
        email,
        localization,
        device,
        termsConditionsSigned: true,
      }

      const response = await API.post<User, AuthMeta>('users', payload)

      ErrorReporting.setUser(response.data)

      return response
    },
    async updateUser(payload: UpdateUserPayload, state) {
      const { user } = state.authentication

      if (user) {
        const changes = getChanges<UpdateUserPayload>(
          payload,
          user as UpdateUserPayload,
        )

        if (Object.entries(changes).length) {
          const { data } = await API.put<User>('users/me', changes)

          dispatch.authentication.setUser(data)
        }
      }
    },
    async fetchUser() {
      const { data } = await API.get<User>('users/me')

      ErrorReporting.setUser(data)

      dispatch.authentication.setUser(data)

      return data
    },
  }),
})
