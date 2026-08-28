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
# @!attribute [rw] conditions
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
# @!attribute [rw] units
#   @return [String, nil]
Weather = Struct.new(
  :conditions,
  :forecast,
  :location,
  :temperature,
  :units,
  keyword_init: true
)

# Request payload for Weather#load.
#
# @!attribute [rw] forecast
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
WeatherLoadMatch = Struct.new(
  :forecast,
  :lat,
  :location,
  :lon,
  :unit,
  keyword_init: true
)

# Request payload for Weather#list.
#
# @!attribute [rw] forecast
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
WeatherListMatch = Struct.new(
  :forecast,
  :lat,
  :location,
  :lon,
  :unit,
  keyword_init: true
)

