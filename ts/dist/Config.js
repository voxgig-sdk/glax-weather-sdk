"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'GlaxWeather',
        slug: "glax-weather",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://dragon.best/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            weather: {},
        }
    };
    entity = {
        "weather": {
            "fields": [
                {
                    "name": "conditions",
                    "short": "Weather conditions",
                    "type": "`$STRING`"
                },
                {
                    "name": "forecast",
                    "short": "Weather forecast data (if requested)",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "location",
                    "short": "Location name",
                    "type": "`$STRING`"
                },
                {
                    "name": "temperature",
                    "short": "Current temperature",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "units",
                    "short": "Units used for measurements",
                    "type": "`$STRING`"
                }
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
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 51.5074,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "London,UK",
                                        "kind": "query",
                                        "name": "location",
                                        "orig": "location",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -0.1276,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "default",
                                        "kind": "query",
                                        "name": "unit",
                                        "orig": "unit",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/glax_weather.json",
                            "segments": [
                                {
                                    "lit": "glax_weather.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "forecast",
                                    "lat",
                                    "location",
                                    "lon",
                                    "unit"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.forecast`"
                            },
                            "parts": [
                                "glax_weather.json"
                            ]
                        }
                    ]
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
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 51.5074,
                                        "kind": "query",
                                        "name": "lat",
                                        "orig": "lat",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "London,UK",
                                        "kind": "query",
                                        "name": "location",
                                        "orig": "location",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -0.1276,
                                        "kind": "query",
                                        "name": "lon",
                                        "orig": "lon",
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": "default",
                                        "kind": "query",
                                        "name": "unit",
                                        "orig": "unit",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/glax_weather.png",
                            "segments": [
                                {
                                    "lit": "glax_weather.png"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "forecast",
                                    "lat",
                                    "location",
                                    "lon",
                                    "unit"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "glax_weather.png"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map