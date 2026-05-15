package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/glax-weather-sdk"
	"github.com/voxgig-sdk/glax-weather-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestWeatherEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Weather(nil)
		if ent == nil {
			t.Fatal("expected non-nil WeatherEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := weatherBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "weather." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set GLAXWEATHER_TEST_WEATHER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		weatherRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.weather", setup.data)))
		var weatherRef01Data map[string]any
		if len(weatherRef01DataRaw) > 0 {
			weatherRef01Data = core.ToMapAny(weatherRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = weatherRef01Data

		// LIST
		weatherRef01Ent := client.Weather(nil)
		weatherRef01Match := map[string]any{}

		weatherRef01ListResult, err := weatherRef01Ent.List(weatherRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, weatherRef01ListOk := weatherRef01ListResult.([]any)
		if !weatherRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", weatherRef01ListResult)
		}

		// LOAD
		weatherRef01MatchDt0 := map[string]any{}
		weatherRef01DataDt0Loaded, err := weatherRef01Ent.Load(weatherRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if weatherRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func weatherBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "weather", "WeatherTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read weather test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse weather test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"weather01", "weather02", "weather03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("GLAXWEATHER_TEST_WEATHER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"GLAXWEATHER_TEST_WEATHER_ENTID": idmap,
		"GLAXWEATHER_TEST_LIVE":      "FALSE",
		"GLAXWEATHER_TEST_EXPLAIN":   "FALSE",
		"GLAXWEATHER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["GLAXWEATHER_TEST_WEATHER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["GLAXWEATHER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["GLAXWEATHER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewGlaxWeatherSDK(core.ToMapAny(mergedOpts))
	}

	live := env["GLAXWEATHER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["GLAXWEATHER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
