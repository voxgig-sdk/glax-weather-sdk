package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewWeatherEntityFunc func(client *GlaxWeatherSDK, entopts map[string]any) GlaxWeatherEntity

