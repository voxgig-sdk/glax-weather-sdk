-- GlaxWeather SDK error

local GlaxWeatherError = {}
GlaxWeatherError.__index = GlaxWeatherError


function GlaxWeatherError.new(code, msg, ctx)
  local self = setmetatable({}, GlaxWeatherError)
  self.is_sdk_error = true
  self.sdk = "GlaxWeather"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GlaxWeatherError:error()
  return self.msg
end


function GlaxWeatherError:__tostring()
  return self.msg
end


return GlaxWeatherError
