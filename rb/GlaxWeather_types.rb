# frozen_string_literal: true

# Typed models for the GlaxWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Weather entity data model.
#
# @!attribute [rw] condition
#   @return [String, nil]
#
# @!attribute [rw] forecast
#   @return [Array, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
Weather = Struct.new(
  :condition,
  :forecast,
  :location,
  :temperature,
  :unit,
  keyword_init: true
)

# Request payload for Weather#load.
#
# @!attribute [rw] condition
#   @return [String, nil]
#
# @!attribute [rw] forecast
#   @return [Array, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
WeatherLoadMatch = Struct.new(
  :condition,
  :forecast,
  :location,
  :temperature,
  :unit,
  keyword_init: true
)

# Request payload for Weather#list.
#
# @!attribute [rw] condition
#   @return [String, nil]
#
# @!attribute [rw] forecast
#   @return [Array, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
WeatherListMatch = Struct.new(
  :condition,
  :forecast,
  :location,
  :temperature,
  :unit,
  keyword_init: true
)

