<?php
declare(strict_types=1);

// GlaxWeather SDK configuration

class GlaxWeatherConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "GlaxWeather",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://dragon.best/api",
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'active' => true,
              'name' => 'condition',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'forecast',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'location',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'temperature',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'unit',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => 51.5074,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'London,UK',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -0.1276,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'default',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/glax_weather.json',
                  'parts' => [
                    'glax_weather.json',
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'forecast',
                        'orig' => 'forecast',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => 51.5074,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'London,UK',
                        'kind' => 'query',
                        'name' => 'location',
                        'orig' => 'location',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -0.1276,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => false,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'default',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/glax_weather.png',
                  'parts' => [
                    'glax_weather.png',
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
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
