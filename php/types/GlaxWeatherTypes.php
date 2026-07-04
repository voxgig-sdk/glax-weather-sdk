<?php
declare(strict_types=1);

// Typed models for the GlaxWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Weather entity data model. */
class Weather
{
    public ?string $condition = null;
    public ?array $forecast = null;
    public ?string $location = null;
    public ?float $temperature = null;
    public ?string $unit = null;
}

/** Match filter for Weather#load (any subset of Weather fields). */
class WeatherLoadMatch
{
    public ?string $condition = null;
    public ?array $forecast = null;
    public ?string $location = null;
    public ?float $temperature = null;
    public ?string $unit = null;
}

/** Match filter for Weather#list (any subset of Weather fields). */
class WeatherListMatch
{
    public ?string $condition = null;
    public ?array $forecast = null;
    public ?string $location = null;
    public ?float $temperature = null;
    public ?string $unit = null;
}

