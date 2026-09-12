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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "Weather conditions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "forecast",
						"short": "Weather forecast data (if requested)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "location",
						"short": "Location name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "temperature",
						"short": "Current temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "units",
						"short": "Units used for measurements",
						"type": "`$STRING`",
					},
				},
				"name": "weather",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "forecast",
											"orig": "forecast",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 51.5074,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "London,UK",
											"kind": "query",
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -0.1276,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/glax_weather.json",
								"segments": []any{
									map[string]any{
										"lit": "glax_weather.json",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"forecast",
										"lat",
										"location",
										"lon",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.forecast`",
								},
								"parts": []any{
									"glax_weather.json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "forecast",
											"orig": "forecast",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 51.5074,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "London,UK",
											"kind": "query",
											"name": "location",
											"orig": "location",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -0.1276,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "default",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/glax_weather.png",
								"segments": []any{
									map[string]any{
										"lit": "glax_weather.png",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"forecast",
										"lat",
										"location",
										"lon",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"glax_weather.png",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
