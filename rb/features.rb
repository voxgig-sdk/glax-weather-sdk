# GlaxWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module GlaxWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      GlaxWeatherBaseFeature.new
    when "test"
      GlaxWeatherTestFeature.new
    else
      GlaxWeatherBaseFeature.new
    end
  end
end
