
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'GlaxWeather',
        slug: "glax-weather",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://dragon.best/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        weather: {
        },
  
    }
  }


  entity = {
    "weather": {
      "fields": [
        {
          "name": "conditions",
          "title": "Conditions",
          "type": "`$STRING`",
          "short": "Weather conditions"
        },
        {
          "name": "forecast",
          "title": "Forecast",
          "type": "`$ARRAY`",
          "short": "Weather forecast data (if requested)"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$STRING`",
          "short": "Location name"
        },
        {
          "name": "temperature",
          "title": "Temperature",
          "type": "`$NUMBER`",
          "short": "Current temperature"
        },
        {
          "name": "units",
          "title": "Units",
          "type": "`$STRING`",
          "short": "Units used for measurements"
        }
      ],
      "name": "weather",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/glax_weather.json",
              "segments": [
                {
                  "lit": "glax_weather.json"
                }
              ],
              "parts": [
                "glax_weather.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.forecast`"
              },
              "args": {
                "query": [
                  {
                    "name": "forecast",
                    "orig": "forecast",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 51.5074
                  },
                  {
                    "name": "location",
                    "orig": "location",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "London,UK"
                  },
                  {
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": -0.1276
                  },
                  {
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "default"
                  }
                ]
              },
              "select": {
                "exist": [
                  "forecast",
                  "lat",
                  "location",
                  "lon",
                  "unit"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/glax_weather.png",
              "segments": [
                {
                  "lit": "glax_weather.png"
                }
              ],
              "parts": [
                "glax_weather.png"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "forecast",
                    "orig": "forecast",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": 51.5074
                  },
                  {
                    "name": "location",
                    "orig": "location",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "London,UK"
                  },
                  {
                    "name": "lon",
                    "orig": "lon",
                    "type": "`$NUMBER`",
                    "kind": "query",
                    "example": -0.1276
                  },
                  {
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "default"
                  }
                ]
              },
              "select": {
                "exist": [
                  "forecast",
                  "lat",
                  "location",
                  "lon",
                  "unit"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

