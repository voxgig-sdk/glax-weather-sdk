-- Typed models for the GlaxWeather SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Weather
---@field conditions? string
---@field forecast? table
---@field location? string
---@field temperature? number
---@field units? string

---@class WeatherLoadMatch
---@field conditions? string
---@field forecast? table
---@field location? string
---@field temperature? number
---@field units? string

---@class WeatherListMatch
---@field conditions? string
---@field forecast? table
---@field location? string
---@field temperature? number
---@field units? string

local M = {}

return M
