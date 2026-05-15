# GlaxWeather SDK utility: feature_add
module GlaxWeatherUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
