package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "GlaxWeather",
			"slug": "glax-weather",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://dragon.best/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"weather": map[string]any{},
			},
		},
		"entity": map[string]any{
			"weather": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "conditions",
						"title": "Conditions",
						"type": "`$STRING`",
						"short": "Weather conditions",
					},
					map[string]any{
						"name": "forecast",
						"title": "Forecast",
						"type": "`$ARRAY`",
						"short": "Weather forecast data (if requested)",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
						"short": "Location name",
					},
					map[string]any{
						"name": "temperature",
						"title": "Temperature",
						"type": "`$NUMBER`",
						"short": "Current temperature",
					},
					map[string]any{
						"name": "units",
						"title": "Units",
						"type": "`$STRING`",
						"short": "Units used for measurements",
					},
				},
				"name": "weather",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/glax_weather.json",
								"segments": []any{
									map[string]any{
										"lit": "glax_weather.json",
									},
								},
								"parts": []any{
									"glax_weather.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.forecast`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "forecast",
											"orig": "forecast",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 51.5074,
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
											"example": "London,UK",
											"field": true,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": -0.1276,
										},
										map[string]any{
											"name": "unit",
											"orig": "units",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/glax_weather.png",
								"segments": []any{
									map[string]any{
										"lit": "glax_weather.png",
									},
								},
								"parts": []any{
									"glax_weather.png",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "forecast",
											"orig": "forecast",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"field": true,
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": 51.5074,
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
											"kind": "query",
											"example": "London,UK",
											"field": true,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"example": -0.1276,
										},
										map[string]any{
											"name": "unit",
											"orig": "units",
											"type": "`$STRING`",
											"kind": "query",
											"example": "default",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"binary": true,
									"kind": "raw",
									"media": "image/png",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
