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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "conditions": { "a": true, "h": "Conditions", "n": "conditions", "r": false, "sh": "Weather conditions", "t": "`$STRING`", "key$": "conditions", "index$": 0 }, "forecast": { "a": true, "h": "Forecast", "n": "forecast", "r": false, "sh": "Weather forecast data (if requested)", "t": "`$ARRAY`", "key$": "forecast", "index$": 1 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Location name", "t": "`$STRING`", "key$": "location", "index$": 2 }, "temperature": { "a": true, "h": "Temperature", "n": "temperature", "r": false, "sh": "Current temperature", "t": "`$NUMBER`", "key$": "temperature", "index$": 3 }, "units": { "a": true, "h": "Units", "n": "units", "r": false, "sh": "Units used for measurements", "t": "`$STRING`", "key$": "units", "index$": 4 } }, "name": "weather", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /glax_weather.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "forecast", "or": "forecast", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 51.5074, "k": "query", "n": "lat", "or": "lat", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": "London,UK", "k": "query", "n": "location", "or": "location", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": -0.1276, "k": "query", "n": "lon", "or": "lon", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "ex": "default", "k": "query", "n": "unit", "or": "unit", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/glax_weather.json", "q": { "exist": ["forecast", "lat", "location", "lon", "unit"] }, "r": {}, "s": [{ "lit": "glax_weather.json" }], "t": { "req": "`reqdata`", "res": "`body.forecast`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /glax_weather.png", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "forecast", "or": "forecast", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 51.5074, "k": "query", "n": "lat", "or": "lat", "r": false, "t": "`$NUMBER`", "index$": 1 }, { "a": true, "ex": "London,UK", "k": "query", "n": "location", "or": "location", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": -0.1276, "k": "query", "n": "lon", "or": "lon", "r": false, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "ex": "default", "k": "query", "n": "unit", "or": "unit", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/glax_weather.png", "q": { "exist": ["forecast", "lat", "location", "lon", "unit"] }, "r": {}, "s": [{ "lit": "glax_weather.png" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weather", "name__orig": "weather", "Name": "Weather", "name_": "weather", "name-": "weather", "NAME": "WEATHER", "index$": 0 }, { "active": true, "entity": "weather", "key$": "BasicWeatherFlow", "kind": "basic", "name": "BasicWeatherFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "weather_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "weather_ref01", "srcdatavar": "weather_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weather_ref01" } }], "index$": 1 }] }, 'Weather', { "GET /glax_weather.json": { "protocol": "http", "operationId": "getWeatherJson", "responses": { "200": { "description": "Successful response with weather data", "content": { "application/json": { "schema": { "type": "object", "properties": { "location": { "description": "Location name", "key$": "location", "type": "string" }, "temperature": { "description": "Current temperature", "key$": "temperature", "type": "number" }, "conditions": { "description": "Weather conditions", "key$": "conditions", "type": "string" }, "units": { "description": "Units used for measurements", "key$": "units", "type": "string" }, "forecast": { "description": "Weather forecast data (if requested)", "items": { "type": "object" }, "key$": "forecast", "type": "array" } }, "index$": 0 } } } }, "400": { "description": "Bad request - invalid parameters" }, "404": { "description": "Location not found" } }, "parameters": [{ "name": "location", "in": "query", "description": "Weather location in format 'city,country'", "required": false, "schema": { "type": "string" }, "example": "London,UK", "index$": 0 }, { "name": "lon", "in": "query", "description": "Longitude (only used if location isn't given)", "required": false, "schema": { "type": "number", "format": "float" }, "example": -0.1276, "index$": 1 }, { "name": "lat", "in": "query", "description": "Latitude (only used if location isn't given)", "required": false, "schema": { "type": "number", "format": "float" }, "example": 51.5074, "index$": 2 }, { "name": "units", "in": "query", "description": "Measure units for temperature and other metrics", "required": false, "schema": { "type": "string", "enum": ["default", "metric", "imperial"], "default": "default" }, "index$": 3 }, { "name": "forecast", "in": "query", "description": "Show weather forecast", "required": false, "schema": { "type": "boolean" }, "index$": 4 }], "securitySource": "unspecified" }, "GET /glax_weather.png": { "protocol": "http", "operationId": "getWeatherPng", "responses": { "200": { "description": "Successful response with weather image", "content": { "image/png": { "schema": { "type": "string", "format": "binary" } } } }, "400": { "description": "Bad request - invalid parameters" }, "404": { "description": "Location not found" } }, "parameters": [{ "name": "location", "in": "query", "description": "Weather location in format 'city,country'", "required": false, "schema": { "type": "string" }, "example": "London,UK", "index$": 0 }, { "name": "lon", "in": "query", "description": "Longitude (only used if location isn't given)", "required": false, "schema": { "type": "number", "format": "float" }, "example": -0.1276, "index$": 1 }, { "name": "lat", "in": "query", "description": "Latitude (only used if location isn't given)", "required": false, "schema": { "type": "number", "format": "float" }, "example": 51.5074, "index$": 2 }, { "name": "units", "in": "query", "description": "Measure units for temperature and other metrics", "required": false, "schema": { "type": "string", "enum": ["default", "metric", "imperial"], "default": "default" }, "index$": 3 }, { "name": "forecast", "in": "query", "description": "Show weather forecast", "required": false, "schema": { "type": "boolean" }, "index$": 4 }], "securitySource": "unspecified" } });
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