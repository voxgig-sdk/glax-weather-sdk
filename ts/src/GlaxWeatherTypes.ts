// Typed models for the GlaxWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Weather {
  conditions?: string
  forecast?: any[]
  location?: string
  temperature?: number
  units?: string
}

export interface WeatherLoadMatch {
  conditions?: string
  forecast?: any[]
  location?: string
  temperature?: number
  units?: string
}

export interface WeatherListMatch {
  conditions?: string
  forecast?: any[]
  location?: string
  temperature?: number
  units?: string
}

