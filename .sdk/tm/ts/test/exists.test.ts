
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { GlaxWeatherSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await GlaxWeatherSDK.test()
    equal(null !== testsdk, true)
  })

})
