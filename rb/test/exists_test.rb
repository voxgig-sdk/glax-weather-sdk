# GlaxWeather SDK exists test

require "minitest/autorun"
require_relative "../GlaxWeather_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = GlaxWeatherSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
