<?php
declare(strict_types=1);

// GlaxWeather SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GlaxWeatherMakeContext
{
    public static function call(array $ctxmap, ?GlaxWeatherContext $basectx): GlaxWeatherContext
    {
        return new GlaxWeatherContext($ctxmap, $basectx);
    }
}
