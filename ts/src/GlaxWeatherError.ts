
import { Context } from './Context'


class GlaxWeatherError extends Error {

  isGlaxWeatherError = true

  sdk = 'GlaxWeather'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GlaxWeatherError
}

