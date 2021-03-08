import { createModel } from '@rematch/core'

import API from '@/utils/API'
import { getLanguage } from '@/utils/Internationalization'
import { getChanges } from '@/utils'
import ErrorReporting from '@/utils/ErrorReporting'
import { RootModel } from '.'
import {
  AuthenticationPayload,
  AuthMeta,
  UpdateUserPayload,
  User,
} from '@/typings'

export default createModel<RootModel>()({
  state: {},
  reducers: {},
  effects: (dispatch) => ({
    async createUser({ mobileNumber }: AuthenticationPayload, state) {
      const payload = {
        mobileNumber,
        localization: getLanguage().toLowerCase(),
        termsConditionsSigned: true,
        device: state.global.device,
      }

      const response = await API.post<User, AuthMeta>('users', payload)

      ErrorReporting.setUser(response.data)

      return response
    },
    async updateUser(payload: UpdateUserPayload, state) {
      const { user } = state.authentication

      if (user) {
        const changes = getChanges(payload, user)

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
