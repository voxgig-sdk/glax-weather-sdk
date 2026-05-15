<?php
declare(strict_types=1);

// GlaxWeather SDK utility: prepare_body

class GlaxWeatherPrepareBody
{
    public static function call(GlaxWeatherContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
