# GlaxWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module GlaxWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      GlaxWeatherBaseFeature.new
    when "ratelimit"
      GlaxWeatherRatelimitFeature.new
    when "retry"
      GlaxWeatherRetryFeature.new
    when "test"
      GlaxWeatherTestFeature.new
    when "timeout"
      GlaxWeatherTimeoutFeature.new
    else
      GlaxWeatherBaseFeature.new
    end
  end
end
