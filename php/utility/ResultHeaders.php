<?php
declare(strict_types=1);

// GlaxWeather SDK utility: result_headers

class GlaxWeatherResultHeaders
{
    public static function call(GlaxWeatherContext $ctx): ?GlaxWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
