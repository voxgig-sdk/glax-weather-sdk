# GlaxWeather SDK

Current weather and hourly forecasts illustrated by Glax the dragon, in JSON or PNG

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Glax Weather API

The Glax Weather API is part of [dragon.best](https://dragon.best/), a small collection of dragon-themed endpoints. The `glax_weather` endpoint returns the current weather for a location, optionally illustrated by Glax the dragon, in either JSON or PNG form.

What you get from the API:

- Current weather for a location specified either by name (`location`) or by coordinates (`lat` / `lon`).
- Hourly forecast data when the `forecast=on` query parameter is supplied.
- Choice of `units` (default, `metric`, or `imperial`).
- PNG output rendered with Glax the dragon, or raw JSON for programmatic use.

Weather data is provided by OpenWeatherMap. CORS is not enabled on the endpoint, so calls from browser code may need to go through a proxy. No authentication or documented rate limits are required for the public endpoint.

## Try it

**TypeScript**
```bash
npm install glax-weather
```

**Python**
```bash
pip install glax-weather-sdk
```

**PHP**
```bash
composer require voxgig/glax-weather-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/glax-weather-sdk/go
```

**Ruby**
```bash
gem install glax-weather-sdk
```

**Lua**
```bash
luarocks install glax-weather-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { GlaxWeatherSDK } from 'glax-weather'

const client = new GlaxWeatherSDK({})

// List all weathers
const weathers = await client.Weather().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o glax-weather-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "glax-weather": {
      "command": "/abs/path/to/glax-weather-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Weather** | Current conditions and optional hourly forecast for a location, returned as JSON or as a Glax-illustrated PNG via `GET /glax_weather.json` (add `?forecast=on` for the hourly forecast). | `/glax_weather.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from glaxweather_sdk import GlaxWeatherSDK

client = GlaxWeatherSDK({})

# List all weathers
weathers, err = client.Weather(None).list(None, None)

# Load a specific weather
weather, err = client.Weather(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'glaxweather_sdk.php';

$client = new GlaxWeatherSDK([]);

// List all weathers
[$weathers, $err] = $client->Weather(null)->list(null, null);

// Load a specific weather
[$weather, $err] = $client->Weather(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/glax-weather-sdk/go"

client := sdk.NewGlaxWeatherSDK(map[string]any{})

// List all weathers
weathers, err := client.Weather(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "GlaxWeather_sdk"

client = GlaxWeatherSDK.new({})

# List all weathers
weathers, err = client.Weather(nil).list(nil, nil)

# Load a specific weather
weather, err = client.Weather(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("glax-weather_sdk")

local client = sdk.new({})

-- List all weathers
local weathers, err = client:Weather(nil):list(nil, nil)

-- Load a specific weather
local weather, err = client:Weather(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = GlaxWeatherSDK.test()
const result = await client.Weather().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = GlaxWeatherSDK.test(None, None)
result, err = client.Weather(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = GlaxWeatherSDK::test(null, null);
[$result, $err] = $client->Weather(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Weather(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GlaxWeatherSDK.test(nil, nil)
result, err = client.Weather(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Weather(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Glax Weather API

- Upstream: [https://dragon.best/weather/](https://dragon.best/weather/)
- API docs: [https://dragon.best/api/](https://dragon.best/api/)

- Site content and API responses are published under the Creative Commons Attribution-ShareAlike licence (CC BY-SA).
- Underlying weather data is sourced from [OpenWeatherMap](https://openweathermap.org/), also distributed under CC BY-SA.
- Attribute both `dragon.best` and OpenWeatherMap when redistributing data or imagery.

---

Generated from the Glax Weather API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
