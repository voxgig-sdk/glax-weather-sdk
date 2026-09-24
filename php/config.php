<?php
declare(strict_types=1);

// GlaxWeather SDK configuration

class GlaxWeatherConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GlaxWeather",
                "slug" => "glax-weather",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://dragon.best/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "weather" => [],
                ],
            ],
            "entity" => [
        'weather' => [
          'fields' => [
            [
              'name' => 'conditions',
              'title' => 'Conditions',
              'type' => '`$STRING`',
              'short' => 'Weather conditions',
            ],
            [
              'name' => 'forecast',
              'title' => 'Forecast',
              'type' => '`$ARRAY`',
              'short' => 'Weather forecast data (if requested)',
            ],
            [
              'name' => 'location',
              'title' => 'Location',
              'type' => '`$STRING`',
              'short' => 'Location name',
            ],
            [
              'name' => 'temperature',
              'title' => 'Temperature',
              'type' => '`$NUMBER`',
              'short' => 'Current temperature',
            ],
            [
              'name' => 'units',
              'title' => 'Units',
              'type' => '`$STRING`',
              'short' => 'Units used for measurements',
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/glax_weather.json',
                  'segments' => [
                    [
                      'lit' => 'glax_weather.json',
                    ],
                  ],
                  'parts' => [
                    'glax_weather.json',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.forecast`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => 51.5074,
                      ],
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'London,UK',
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => -0.1276,
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'default',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'forecast',
                      'lat',
                      'location',
                      'lon',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/glax_weather.png',
                  'segments' => [
                    [
                      'lit' => 'glax_weather.png',
                    ],
                  ],
                  'parts' => [
                    'glax_weather.png',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'type' => '`$BOOLEAN`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => 51.5074,
                      ],
                      [
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'London,UK',
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'example' => -0.1276,
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'default',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'forecast',
                      'lat',
                      'location',
                      'lon',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return GlaxWeatherFeatures::make_feature($name);
    }
}
