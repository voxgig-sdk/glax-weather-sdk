# GlaxWeather SDK feature factory

from glaxweather_sdk.feature.base_feature import GlaxWeatherBaseFeature
from glaxweather_sdk.feature.ratelimit_feature import GlaxWeatherRatelimitFeature
from glaxweather_sdk.feature.retry_feature import GlaxWeatherRetryFeature
from glaxweather_sdk.feature.test_feature import GlaxWeatherTestFeature
from glaxweather_sdk.feature.timeout_feature import GlaxWeatherTimeoutFeature


_FEATURES = {
    "base": lambda: GlaxWeatherBaseFeature(),
    "ratelimit": lambda: GlaxWeatherRatelimitFeature(),
    "retry": lambda: GlaxWeatherRetryFeature(),
    "test": lambda: GlaxWeatherTestFeature(),
    "timeout": lambda: GlaxWeatherTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
