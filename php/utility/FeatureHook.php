<?php
declare(strict_types=1);

// GlaxWeather SDK utility: feature_hook

class GlaxWeatherFeatureHook
{
    public static function call(GlaxWeatherContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
