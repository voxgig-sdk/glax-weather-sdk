# Weather entity test

require "minitest/autorun"
require "json"
require_relative "../GlaxWeather_sdk"
require_relative "runner"

class WeatherEntityTest < Minitest::Test
  def test_create_instance
    testsdk = GlaxWeatherSDK.test(nil, nil)
    ent = testsdk.Weather(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = weather_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "weather." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set GLAXWEATHER_TEST_WEATHER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    weather_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.weather")))
    weather_ref01_data = nil
    if weather_ref01_data_raw.length > 0
      weather_ref01_data = Helpers.to_map(weather_ref01_data_raw[0][1])
    end

    # LIST
    weather_ref01_ent = client.Weather(nil)
    weather_ref01_match = {}

    weather_ref01_list_result = weather_ref01_ent.list(weather_ref01_match, nil)
    assert weather_ref01_list_result.is_a?(Array)

    # LOAD
    weather_ref01_match_dt0 = {}
    weather_ref01_data_dt0_loaded = weather_ref01_ent.load(weather_ref01_match_dt0, nil)
    assert !weather_ref01_data_dt0_loaded.nil?

  end
end

def weather_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "weather", "WeatherTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = GlaxWeatherSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["weather01", "weather02", "weather03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["GLAXWEATHER_TEST_WEATHER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "GLAXWEATHER_TEST_WEATHER_ENTID" => idmap,
    "GLAXWEATHER_TEST_LIVE" => "FALSE",
    "GLAXWEATHER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["GLAXWEATHER_TEST_WEATHER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["GLAXWEATHER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = GlaxWeatherSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["GLAXWEATHER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["GLAXWEATHER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
