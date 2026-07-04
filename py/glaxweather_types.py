# Typed models for the GlaxWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Weather:
    condition: Optional[str] = None
    forecast: Optional[list] = None
    location: Optional[str] = None
    temperature: Optional[float] = None
    unit: Optional[str] = None


@dataclass
class WeatherLoadMatch:
    condition: Optional[str] = None
    forecast: Optional[list] = None
    location: Optional[str] = None
    temperature: Optional[float] = None
    unit: Optional[str] = None


@dataclass
class WeatherListMatch:
    condition: Optional[str] = None
    forecast: Optional[list] = None
    location: Optional[str] = None
    temperature: Optional[float] = None
    unit: Optional[str] = None

