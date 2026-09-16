"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WeatherEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GLAX_WEATHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GLAX_WEATHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GlaxWeatherSDK.test();
        const ent = testsdk.Weather();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GLAX_WEATHER_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'weather.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "conditions", "req": false, "short": "Weather conditions", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "forecast", "req": false, "short": "Weather forecast data (if requested)", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "location", "req": false, "short": "Location name", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "temperature", "req": false, "short": "Current temperature", "type": "`$NUMBER`", "index$": 3 }, { "active": true, "name": "units", "req": false, "short": "Units used for measurements", "type": "`$STRING`", "index$": 4 }], "name": "weather", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "forecast", "orig": "forecast", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": 51.5074, "kind": "query", "name": "lat", "orig": "lat", "reqd": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "example": "London,UK", "kind": "query", "name": "location", "orig": "location", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": -0.1276, "kind": "query", "name": "lon", "orig": "lon", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": "default", "kind": "query", "name": "unit", "orig": "unit", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /glax_weather.json", "json": "{\"operationId\":\"getWeatherJson\",\"parameters\":[{\"description\":\"Weather location in format 'city,country'\",\"example\":\"London,UK\",\"in\":\"query\",\"name\":\"location\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Longitude (only used if location isn't given)\",\"example\":-0.1276,\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Latitude (only used if location isn't given)\",\"example\":51.5074,\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Measure units for temperature and other metrics\",\"in\":\"query\",\"name\":\"units\",\"required\":false,\"schema\":{\"default\":\"default\",\"enum\":[\"default\",\"metric\",\"imperial\"],\"type\":\"string\"}},{\"description\":\"Show weather forecast\",\"in\":\"query\",\"name\":\"forecast\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"conditions\":{\"description\":\"Weather conditions\",\"type\":\"string\"},\"forecast\":{\"description\":\"Weather forecast data (if requested)\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"location\":{\"description\":\"Location name\",\"type\":\"string\"},\"temperature\":{\"description\":\"Current temperature\",\"type\":\"number\"},\"units\":{\"description\":\"Units used for measurements\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with weather data\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"Location not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/glax_weather.json", "segments": [{ "lit": "glax_weather.json" }], "select": { "exist": ["forecast", "lat", "location", "lon", "unit"] }, "transform": { "req": "`reqdata`", "res": "`body.forecast`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "forecast", "orig": "forecast", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": 51.5074, "kind": "query", "name": "lat", "orig": "lat", "reqd": false, "type": "`$NUMBER`", "index$": 1 }, { "active": true, "example": "London,UK", "kind": "query", "name": "location", "orig": "location", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": -0.1276, "kind": "query", "name": "lon", "orig": "lon", "reqd": false, "type": "`$NUMBER`", "index$": 3 }, { "active": true, "example": "default", "kind": "query", "name": "unit", "orig": "unit", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /glax_weather.png", "json": "{\"operationId\":\"getWeatherPng\",\"parameters\":[{\"description\":\"Weather location in format 'city,country'\",\"example\":\"London,UK\",\"in\":\"query\",\"name\":\"location\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Longitude (only used if location isn't given)\",\"example\":-0.1276,\"in\":\"query\",\"name\":\"lon\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Latitude (only used if location isn't given)\",\"example\":51.5074,\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Measure units for temperature and other metrics\",\"in\":\"query\",\"name\":\"units\",\"required\":false,\"schema\":{\"default\":\"default\",\"enum\":[\"default\",\"metric\",\"imperial\"],\"type\":\"string\"}},{\"description\":\"Show weather forecast\",\"in\":\"query\",\"name\":\"forecast\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successful response with weather image\"},\"400\":{\"description\":\"Bad request - invalid parameters\"},\"404\":{\"description\":\"Location not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/glax_weather.png", "segments": [{ "lit": "glax_weather.png" }], "select": { "exist": ["forecast", "lat", "location", "lon", "unit"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weather", "name__orig": "weather", "Name": "Weather", "name_": "weather", "name-": "weather", "NAME": "WEATHER", "index$": 0 }, { "active": true, "entity": "weather", "key$": "BasicWeatherFlow", "kind": "basic", "name": "BasicWeatherFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "weather_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "weather_ref01", "srcdatavar": "weather_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weather_ref01" } }], "index$": 1 }] }, 'Weather');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let weather_ref01_data = Object.values(setup.data.existing.weather)[0];
        // LIST
        const weather_ref01_ent = client.Weather();
        const weather_ref01_match = {};
        const weather_ref01_list = (await weather_ref01_ent.list(weather_ref01_match)).map((e) => e.data());
        // LOAD
        const weather_ref01_match_dt0 = {};
        const weather_ref01_data_dt0 = (await weather_ref01_ent.load(weather_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != weather_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/weather/WeatherTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GlaxWeatherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['weather01', 'weather02', 'weather03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GLAX_WEATHER_TEST_WEATHER_ENTID': idmap,
        'GLAX_WEATHER_TEST_LIVE': 'FALSE',
        'GLAX_WEATHER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['GLAX_WEATHER_TEST_WEATHER_ENTID'];
    const live = 'TRUE' === env.GLAX_WEATHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GLAX_WEATHER_TEST_WEATHER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GlaxWeatherSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GLAX_WEATHER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WeatherEntity.test.js.map