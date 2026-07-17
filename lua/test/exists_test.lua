-- GlaxWeather SDK exists test

local sdk = require("glax-weather_sdk")

describe("GlaxWeatherSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
