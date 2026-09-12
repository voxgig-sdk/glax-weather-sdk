# GlaxWeather SDK configuration

module GlaxWeatherConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "GlaxWeather",
        "slug" => "glax-weather",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://dragon.best/api",
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
              "name" => "conditions",
              "short" => "Weather conditions",
              "type" => "`$STRING`",
            },
            {
              "name" => "forecast",
              "short" => "Weather forecast data (if requested)",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "location",
              "short" => "Location name",
              "type" => "`$STRING`",
            },
            {
              "name" => "temperature",
              "short" => "Current temperature",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "units",
              "short" => "Units used for measurements",
              "type" => "`$STRING`",
            },
          ],
          "name" => "weather",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "forecast",
                        "orig" => "forecast",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 51.5074,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "London,UK",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => -0.1276,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "default",
                        "kind" => "query",
                        "name" => "unit",
                        "orig" => "unit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/glax_weather.json",
                  "segments" => [
                    {
                      "lit" => "glax_weather.json",
                    },
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
                    "res" => "`body.forecast`",
                  },
                  "parts" => [
                    "glax_weather.json",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "forecast",
                        "orig" => "forecast",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 51.5074,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "London,UK",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => -0.1276,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => "default",
                        "kind" => "query",
                        "name" => "unit",
                        "orig" => "unit",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/glax_weather.png",
                  "segments" => [
                    {
                      "lit" => "glax_weather.png",
                    },
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
                  "parts" => [
                    "glax_weather.png",
                  ],
                },
              ],
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
