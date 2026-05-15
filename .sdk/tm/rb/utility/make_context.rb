# GlaxWeather SDK utility: make_context
require_relative '../core/context'
module GlaxWeatherUtilities
  MakeContext = ->(ctxmap, basectx) {
    GlaxWeatherContext.new(ctxmap, basectx)
  }
end
