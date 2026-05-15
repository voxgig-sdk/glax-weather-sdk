<?php
declare(strict_types=1);

// GlaxWeather SDK utility: feature_add

class GlaxWeatherFeatureAdd
{
    public static function call(GlaxWeatherContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
