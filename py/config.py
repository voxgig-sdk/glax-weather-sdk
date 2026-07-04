# GlaxWeather SDK configuration


def make_config():
    return {
        "main": {
            "name": "GlaxWeather",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "condition",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "forecast",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "location",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "temperature",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "unit",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
        ],
        "name": "weather",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "forecast",
                      "orig": "forecast",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 51.5074,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "London,UK",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -0.1276,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "default",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "forecast",
                      "orig": "forecast",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 51.5074,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "London,UK",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -0.1276,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": False,
                      "type": "`$NUMBER`",
                    },
                    {
                      "active": True,
                      "example": "default",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
