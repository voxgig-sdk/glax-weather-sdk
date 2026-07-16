<?php
declare(strict_types=1);

// GlaxWeather SDK base feature

class GlaxWeatherBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GlaxWeatherContext $ctx, array $options): void {}
    public function PostConstruct(GlaxWeatherContext $ctx): void {}
    public function PostConstructEntity(GlaxWeatherContext $ctx): void {}
    public function SetData(GlaxWeatherContext $ctx): void {}
    public function GetData(GlaxWeatherContext $ctx): void {}
    public function GetMatch(GlaxWeatherContext $ctx): void {}
    public function SetMatch(GlaxWeatherContext $ctx): void {}
    public function PrePoint(GlaxWeatherContext $ctx): void {}
    public function PreSpec(GlaxWeatherContext $ctx): void {}
    public function PreRequest(GlaxWeatherContext $ctx): void {}
    public function PreResponse(GlaxWeatherContext $ctx): void {}
    public function PreResult(GlaxWeatherContext $ctx): void {}
    public function PreDone(GlaxWeatherContext $ctx): void {}
    public function PreUnexpected(GlaxWeatherContext $ctx): void {}
}
