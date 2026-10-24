

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { GlaxWeatherSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('WeatherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when GLAX_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('GLAX_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = GlaxWeatherSDK.test()
    const ent = testsdk.Weather()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('weather hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of GlaxWeatherSDK.test(offline).Weather().stream('list')) { }
    }, /offline/)

    for await (const _item of GlaxWeatherSDK.test(offline).Weather()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = GlaxWeatherSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Weather().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of GlaxWeatherSDK.test().Weather().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new GlaxWeatherSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Weather().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Weather().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = GlaxWeatherSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Weather().list({"forecast":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.GLAX_WEATHER_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'weather.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"conditions":{"a":true,"h":"Conditions","n":"conditions","r":false,"sh":"Weather conditions","t":"`$STRING`","key$":"conditions","index$":0},"forecast":{"a":true,"h":"Forecast","n":"forecast","r":false,"sh":"Weather forecast data (if requested)","t":"`$ARRAY`","key$":"forecast","index$":1},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location name","t":"`$STRING`","key$":"location","index$":2},"temperature":{"a":true,"h":"Temperature","n":"temperature","r":false,"sh":"Current temperature","t":"`$NUMBER`","key$":"temperature","index$":3},"units":{"a":true,"h":"Units","n":"units","r":false,"sh":"Units used for measurements","t":"`$STRING`","key$":"units","index$":4}},"name":"weather","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /glax_weather.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"forecast","or":"forecast","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":51.5074,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":"London,UK","k":"query","n":"location","or":"location","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":-0.1276,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"ex":"default","k":"query","n":"unit","or":"units","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/glax_weather.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"glax_weather.json"}],"t":{"req":"`reqdata`","res":"`body.forecast`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /glax_weather.png","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"forecast","or":"forecast","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":51.5074,"k":"query","n":"lat","or":"lat","r":false,"t":"`$NUMBER`","index$":1},{"a":true,"ex":"London,UK","k":"query","n":"location","or":"location","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":-0.1276,"k":"query","n":"lon","or":"lon","r":false,"t":"`$NUMBER`","index$":3},{"a":true,"ex":"default","k":"query","n":"unit","or":"units","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/glax_weather.png","q":{},"r":{},"rs":{"binary":true,"kind":"raw","media":"image/png"},"s":[{"lit":"glax_weather.png"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"weather","name__orig":"weather","Name":"Weather","name_":"weather","name-":"weather","NAME":"WEATHER","index$":0}, {"active":true,"entity":"weather","key$":"BasicWeatherFlow","kind":"basic","name":"BasicWeatherFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"weather_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"weather_ref01","srcdatavar":"weather_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-weather_ref01"}}],"index$":1}]}, 'Weather', {"GET /glax_weather.json":{"protocol":"http","parameters":[{"name":"location","in":"query","description":"Weather location in format 'city,country'","required":false,"schema":{"type":"string"},"example":"London,UK","index$":0},{"name":"lon","in":"query","description":"Longitude (only used if location isn't given)","required":false,"schema":{"type":"number","format":"float"},"example":-0.1276,"index$":1},{"name":"lat","in":"query","description":"Latitude (only used if location isn't given)","required":false,"schema":{"type":"number","format":"float"},"example":51.5074,"index$":2},{"name":"units","in":"query","description":"Measure units for temperature and other metrics","required":false,"schema":{"type":"string","enum":["default","metric","imperial"],"default":"default"},"index$":3},{"name":"forecast","in":"query","description":"Show weather forecast","required":false,"schema":{"type":"boolean"},"index$":4}]},"GET /glax_weather.png":{"protocol":"http","parameters":[{"name":"location","in":"query","description":"Weather location in format 'city,country'","required":false,"schema":{"type":"string"},"example":"London,UK","index$":0},{"name":"lon","in":"query","description":"Longitude (only used if location isn't given)","required":false,"schema":{"type":"number","format":"float"},"example":-0.1276,"index$":1},{"name":"lat","in":"query","description":"Latitude (only used if location isn't given)","required":false,"schema":{"type":"number","format":"float"},"example":51.5074,"index$":2},{"name":"units","in":"query","description":"Measure units for temperature and other metrics","required":false,"schema":{"type":"string","enum":["default","metric","imperial"],"default":"default"},"index$":3},{"name":"forecast","in":"query","description":"Show weather forecast","required":false,"schema":{"type":"boolean"},"index$":4}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let weather_ref01_data = Object.values(setup.data.existing.weather)[0] as any

    // LIST
    const weather_ref01_ent = client.Weather()
    const weather_ref01_match: any = {}

    const weather_ref01_list = (await weather_ref01_ent.list(weather_ref01_match)).map((e: any) => e.data())


    // LOAD
    const weather_ref01_match_dt0: any = {}
    const weather_ref01_data_dt0 = (await weather_ref01_ent.load(weather_ref01_match_dt0)).data()
    assert(null != weather_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/weather/WeatherTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = GlaxWeatherSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['weather01','weather02','weather03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'GLAX_WEATHER_TEST_WEATHER_ENTID': idmap,
    'GLAX_WEATHER_TEST_LIVE': 'FALSE',
    'GLAX_WEATHER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['GLAX_WEATHER_TEST_WEATHER_ENTID']

  const live = 'TRUE' === env.GLAX_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['GLAX_WEATHER_TEST_WEATHER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new GlaxWeatherSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.GLAX_WEATHER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
