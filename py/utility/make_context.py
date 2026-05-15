# GlaxWeather SDK utility: make_context

from core.context import GlaxWeatherContext


def make_context_util(ctxmap, basectx):
    return GlaxWeatherContext(ctxmap, basectx)
