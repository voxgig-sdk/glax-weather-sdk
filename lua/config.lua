-- GlaxWeather SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "GlaxWeather",
      slug = "glax-weather",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://dragon.best/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["weather"] = {},
      },
    },
    entity = {
      ["weather"] = {
        ["fields"] = {
          {
            ["name"] = "conditions",
            ["title"] = "Conditions",
            ["type"] = "`$STRING`",
            ["short"] = "Weather conditions",
          },
          {
            ["name"] = "forecast",
            ["title"] = "Forecast",
            ["type"] = "`$ARRAY`",
            ["short"] = "Weather forecast data (if requested)",
          },
          {
            ["name"] = "location",
            ["title"] = "Location",
            ["type"] = "`$STRING`",
            ["short"] = "Location name",
          },
          {
            ["name"] = "temperature",
            ["title"] = "Temperature",
            ["type"] = "`$NUMBER`",
            ["short"] = "Current temperature",
          },
          {
            ["name"] = "units",
            ["title"] = "Units",
            ["type"] = "`$STRING`",
            ["short"] = "Units used for measurements",
          },
        },
        ["name"] = "weather",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/glax_weather.json",
                ["segments"] = {
                  {
                    ["lit"] = "glax_weather.json",
                  },
                },
                ["parts"] = {
                  "glax_weather.json",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.forecast`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "forecast",
                      ["orig"] = "forecast",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 51.5074,
                    },
                    {
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "London,UK",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = -0.1276,
                    },
                    {
                      ["name"] = "unit",
                      ["orig"] = "units",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "default",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/glax_weather.png",
                ["segments"] = {
                  {
                    ["lit"] = "glax_weather.png",
                  },
                },
                ["parts"] = {
                  "glax_weather.png",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "forecast",
                      ["orig"] = "forecast",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = 51.5074,
                    },
                    {
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "London,UK",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                      ["kind"] = "query",
                      ["example"] = -0.1276,
                    },
                    {
                      ["name"] = "unit",
                      ["orig"] = "units",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "default",
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["binary"] = true,
                  ["kind"] = "raw",
                  ["media"] = "image/png",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
