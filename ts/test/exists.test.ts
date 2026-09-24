
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GlaxWeatherSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = GlaxWeatherSDK.test()
    equal(testsdk instanceof GlaxWeatherSDK, true,
      'GlaxWeatherSDK.test() must return a client synchronously')
  })

})
