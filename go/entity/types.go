// Typed models for the GlaxWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Weather is the typed data model for the weather entity.
type Weather struct {
	Condition *string `json:"condition,omitempty"`
	Forecast *[]any `json:"forecast,omitempty"`
	Location *string `json:"location,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// WeatherLoadMatch mirrors the weather fields as an all-optional match
// filter (Go analog of Partial<Weather>).
type WeatherLoadMatch struct {
	Condition *string `json:"condition,omitempty"`
	Forecast *[]any `json:"forecast,omitempty"`
	Location *string `json:"location,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// WeatherListMatch mirrors the weather fields as an all-optional match
// filter (Go analog of Partial<Weather>).
type WeatherListMatch struct {
	Condition *string `json:"condition,omitempty"`
	Forecast *[]any `json:"forecast,omitempty"`
	Location *string `json:"location,omitempty"`
	Temperature *float64 `json:"temperature,omitempty"`
	Unit *string `json:"unit,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
