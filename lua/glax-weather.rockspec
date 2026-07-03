package = "voxgig-sdk-glax-weather"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/glax-weather-sdk.git",
  tag = "lua/v0.0.1",
  dir = "glax-weather-sdk/lua"
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
