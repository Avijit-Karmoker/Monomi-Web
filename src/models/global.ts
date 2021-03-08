import { createModel } from '@rematch/core'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import DeviceDetector from 'device-detector-js'

import { GlobalState } from '@/typings'
import { RootModel } from '.'

export default createModel<RootModel>()({
  state: {
    device: null,
  } as GlobalState,
  reducers: {
    setDevice(state, device: GlobalState['device']) {
      return {
        ...state,
        device: device ? { ...state.device, ...device } : null,
      }
    },
    changeDevice(state, device: Partial<GlobalState['device']>) {
      return { ...state, device: { ...state.device!, ...device } }
    },
  },
  effects: (dispatch) => ({
    async fetchDevice() {
      const detection = new DeviceDetector().parse(window.navigator.userAgent)

      const fp = await FingerprintJS.load()
      const { visitorId } = await fp.get()

      const device = {
        fingerprint: visitorId,
        os: detection.os?.name,
        version: detection.os?.version,
        make: detection.device?.brand,
        model: detection.device?.model,
        name: detection.client?.name,
      }

      dispatch.global.setDevice(device)
    },
  }),
})
