import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "weather",
    "accessor": "Weather",
    "op": "list",
    "method": "GET",
    "path": "/glax_weather.json",
    "args": [],
    "select": {
      "forecast": "v1",
      "lat": 51.5074,
      "location": "London,UK",
      "lon": -0.1276,
      "unit": "v1"
    },
    "headers": [],
    "query": [
      "location",
      "lon",
      "lat",
      "units",
      "forecast"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "location": "x",
      "temperature": 1,
      "conditions": "x",
      "units": "x",
      "forecast": [
        {}
      ]
    },
    "idField": "id"
  },
  {
    "entity": "weather",
    "accessor": "Weather",
    "op": "load",
    "method": "GET",
    "path": "/glax_weather.png",
    "args": [],
    "select": {
      "forecast": "v1",
      "lat": 51.5074,
      "location": "London,UK",
      "lon": -0.1276,
      "unit": "v1"
    },
    "headers": [],
    "query": [
      "location",
      "lon",
      "lat",
      "units",
      "forecast"
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
