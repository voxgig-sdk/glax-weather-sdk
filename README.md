# GlaxWeather SDK

Glax Weather API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { GlaxWeatherSDK } from 'glax-weather'

const client = new GlaxWeatherSDK({
  apikey: process.env.GLAX-WEATHER_APIKEY,
})

// List all weathers
const weathers = await client.Weather().list()
console.log(weathers.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Weather** |  | `/glax_weather.json` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from glaxweather_sdk import GlaxWeatherSDK

client = GlaxWeatherSDK({
    "apikey": os.environ.get("GLAX-WEATHER_APIKEY"),
})

# List all weathers
weathers, err = client.Weather().list()
print(weathers)

# Load a specific weather
weather, err = client.Weather().load({"id": "example_id"})
print(weather)
```

### PHP

```php
<?php
require_once 'glaxweather_sdk.php';

$client = new GlaxWeatherSDK([
    "apikey" => getenv("GLAX-WEATHER_APIKEY"),
]);

// List all weathers
[$weathers, $err] = $client->Weather()->list();
print_r($weathers);

// Load a specific weather
[$weather, $err] = $client->Weather()->load(["id" => "example_id"]);
print_r($weather);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/glax-weather-sdk/go"

client := sdk.NewGlaxWeatherSDK(map[string]any{
    "apikey": os.Getenv("GLAX-WEATHER_APIKEY"),
})

// List all weathers
weathers, err := client.Weather(nil).List(nil, nil)
fmt.Println(weathers)
```

### Ruby

```ruby
require_relative "GlaxWeather_sdk"

client = GlaxWeatherSDK.new({
  "apikey" => ENV["GLAX-WEATHER_APIKEY"],
})

# List all weathers
weathers, err = client.Weather().list
puts weathers

# Load a specific weather
weather, err = client.Weather().load({ "id" => "example_id" })
puts weather
```

### Lua

```lua
local sdk = require("glax-weather_sdk")

local client = sdk.new({
  apikey = os.getenv("GLAX-WEATHER_APIKEY"),
})

-- List all weathers
local weathers, err = client:Weather():list()
print(weathers)

-- Load a specific weather
local weather, err = client:Weather():load({ id = "example_id" })
print(weather)
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
client = GlaxWeatherSDK.test()
result, err = client.Weather().load({"id": "test01"})
```

### PHP

```php
$client = GlaxWeatherSDK::test();
[$result, $err] = $client->Weather()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Weather(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = GlaxWeatherSDK.test
result, err = client.Weather().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Weather():load({ id = "test01" })
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

---

Generated from the Glax Weather API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
