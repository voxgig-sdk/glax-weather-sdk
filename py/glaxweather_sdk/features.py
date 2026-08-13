# GlaxWeather SDK feature factory

from glaxweather_sdk.feature.base_feature import GlaxWeatherBaseFeature
from glaxweather_sdk.feature.test_feature import GlaxWeatherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GlaxWeatherBaseFeature(),
        "test": lambda: GlaxWeatherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
