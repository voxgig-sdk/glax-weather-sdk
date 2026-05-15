<?php
declare(strict_types=1);

// GlaxWeather SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class GlaxWeatherFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new GlaxWeatherBaseFeature();
            case "test":
                return new GlaxWeatherTestFeature();
            default:
                return new GlaxWeatherBaseFeature();
        }
    }
}
