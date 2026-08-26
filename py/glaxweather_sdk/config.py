# GlaxWeather SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Weather conditions",
            "type": "`$STRING`",
          },
          {
            "name": "forecast",
            "short": "Weather forecast data (if requested)",
            "type": "`$ARRAY`",
          },
          {
            "name": "location",
            "short": "Location name",
            "type": "`$STRING`",
          },
          {
            "name": "temperature",
            "short": "Current temperature",
            "type": "`$NUMBER`",
          },
          {
            "name": "units",
            "short": "Units used for measurements",
            "type": "`$STRING`",
          },
        ],
        "name": "weather",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "forecast",
                      "orig": "forecast",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 51.5074,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "London,UK",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                    },
                    {
                      "example": -0.1276,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/glax_weather.json",
                "parts": [
                  "glax_weather.json",
                ],
                "select": {
                  "exist": [
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.forecast`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "forecast",
                      "orig": "forecast",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 51.5074,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "London,UK",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$STRING`",
                    },
                    {
                      "example": -0.1276,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "default",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/glax_weather.png",
                "parts": [
                  "glax_weather.png",
                ],
                "select": {
                  "exist": [
                    "forecast",
                    "lat",
                    "location",
                    "lon",
                    "unit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
