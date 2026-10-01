# GlaxWeather SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "GlaxWeather",
            "slug": "glax-weather",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://dragon.best/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "weather": {},
            },
        },
        "entity": {
      "weather": {
        "fields": [
          {
            "name": "conditions",
            "title": "Conditions",
            "type": "`$STRING`",
            "short": "Weather conditions",
          },
          {
            "name": "forecast",
            "title": "Forecast",
            "type": "`$ARRAY`",
            "short": "Weather forecast data (if requested)",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
            "short": "Location name",
          },
          {
            "name": "temperature",
            "title": "Temperature",
            "type": "`$NUMBER`",
            "short": "Current temperature",
          },
          {
            "name": "units",
            "title": "Units",
            "type": "`$STRING`",
            "short": "Units used for measurements",
          },
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
                    "lit": "glax_weather.json",
                  },
                ],
                "parts": [
                  "glax_weather.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.forecast`",
                },
                "args": {
                  "query": [
                    {
                      "name": "forecast",
                      "orig": "forecast",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 51.5074,
                    },
                    {
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "London,UK",
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": -0.1276,
                    },
                    {
                      "name": "unit",
                      "orig": "units",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  ],
                },
              },
            ],
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
                    "lit": "glax_weather.png",
                  },
                ],
                "parts": [
                  "glax_weather.png",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "forecast",
                      "orig": "forecast",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": 51.5074,
                    },
                    {
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "London,UK",
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "example": -0.1276,
                    },
                    {
                      "name": "unit",
                      "orig": "units",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "default",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
