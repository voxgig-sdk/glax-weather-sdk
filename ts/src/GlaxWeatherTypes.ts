// Typed models for the GlaxWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Weather {
  condition?: string
  forecast?: any[]
  location?: string
  temperature?: number
  unit?: string
}

export type WeatherLoadMatch = Partial<Weather>

export type WeatherListMatch = Partial<Weather>

