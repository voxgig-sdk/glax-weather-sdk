package core

type GlaxWeatherError struct {
	IsGlaxWeatherError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGlaxWeatherError(code string, msg string, ctx *Context) *GlaxWeatherError {
	return &GlaxWeatherError{
		IsGlaxWeatherError: true,
		Sdk:              "GlaxWeather",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GlaxWeatherError) Error() string {
	return e.Msg
}
