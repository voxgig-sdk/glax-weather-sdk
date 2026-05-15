# GlaxWeather SDK configuration

module GlaxWeatherConfig
  def self.make_config
    {
      "main" => {
        "name" => "GlaxWeather",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://dragon.best/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "weather" => {},
        },
      },
      "entity" => {
        "weather" => {
          "fields" => [
            {
              "name" => "condition",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "forecast",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "location",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "temperature",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "unit",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "weather",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "forecast",
                        "orig" => "forecast",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "example" => 51.5074,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => "London,UK",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => -0.1276,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => "default",
                        "kind" => "query",
                        "name" => "unit",
                        "orig" => "unit",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/glax_weather.json",
                  "parts" => [
                    "glax_weather.json",
                  ],
                  "select" => {
                    "exist" => [
                      "forecast",
                      "lat",
                      "location",
                      "lon",
                      "unit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "forecast",
                        "orig" => "forecast",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
                      },
                      {
                        "example" => 51.5074,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => "London,UK",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => -0.1276,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => false,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => "default",
                        "kind" => "query",
                        "name" => "unit",
                        "orig" => "unit",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/glax_weather.png",
                  "parts" => [
                    "glax_weather.png",
                  ],
                  "select" => {
                    "exist" => [
                      "forecast",
                      "lat",
                      "location",
                      "lon",
                      "unit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    GlaxWeatherFeatures.make_feature(name)
  end
end
