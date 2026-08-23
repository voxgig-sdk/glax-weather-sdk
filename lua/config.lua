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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["short"] = "Weather conditions",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "forecast",
            ["short"] = "Weather forecast data (if requested)",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "location",
            ["short"] = "Location name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "temperature",
            ["short"] = "Current temperature",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "units",
            ["short"] = "Units used for measurements",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "weather",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "forecast",
                      ["orig"] = "forecast",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 51.5074,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "London,UK",
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = -0.1276,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/glax_weather.json",
                ["parts"] = {
                  "glax_weather.json",
                },
                ["select"] = {
                  ["exist"] = {
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.forecast`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "forecast",
                      ["orig"] = "forecast",
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["example"] = 51.5074,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "London,UK",
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = -0.1276,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "default",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/glax_weather.png",
                ["parts"] = {
                  "glax_weather.png",
                },
                ["select"] = {
                  ["exist"] = {
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
