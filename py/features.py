# GlaxWeather SDK feature factory

from feature.base_feature import GlaxWeatherBaseFeature
from feature.test_feature import GlaxWeatherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: GlaxWeatherBaseFeature(),
        "test": lambda: GlaxWeatherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
