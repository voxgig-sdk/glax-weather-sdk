<?php
declare(strict_types=1);

// GlaxWeather SDK utility: result_body

class GlaxWeatherResultBody
{
    public static function call(GlaxWeatherContext $ctx): ?GlaxWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
