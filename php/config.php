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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'short' => 'Weather conditions',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'forecast',
              'short' => 'Weather forecast data (if requested)',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'location',
              'short' => 'Location name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'temperature',
              'short' => 'Current temperature',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'units',
              'short' => 'Units used for measurements',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 51.5074,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'London,UK',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -0.1276,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'default',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/glax_weather.json',
                  'segments' => [
                    [
                      'lit' => 'glax_weather.json',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.forecast`',
                  ],
                  'parts' => [
                    'glax_weather.json',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 51.5074,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'London,UK',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -0.1276,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'default',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/glax_weather.png',
                  'segments' => [
                    [
                      'lit' => 'glax_weather.png',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'glax_weather.png',
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
