package = "voxgig-sdk-glax-weather"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/glax-weather-sdk.git"
}
description = {
  summary = "GlaxWeather SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["glax-weather_sdk"] = "glax-weather_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
