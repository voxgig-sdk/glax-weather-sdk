# GlaxWeather SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

GlaxWeatherUtility.registrar = ->(u) {
  u.clean = GlaxWeatherUtilities::Clean
  u.done = GlaxWeatherUtilities::Done
  u.make_error = GlaxWeatherUtilities::MakeError
  u.feature_add = GlaxWeatherUtilities::FeatureAdd
  u.feature_hook = GlaxWeatherUtilities::FeatureHook
  u.feature_init = GlaxWeatherUtilities::FeatureInit
  u.fetcher = GlaxWeatherUtilities::Fetcher
  u.make_fetch_def = GlaxWeatherUtilities::MakeFetchDef
  u.make_context = GlaxWeatherUtilities::MakeContext
  u.make_options = GlaxWeatherUtilities::MakeOptions
  u.make_request = GlaxWeatherUtilities::MakeRequest
  u.make_response = GlaxWeatherUtilities::MakeResponse
  u.make_result = GlaxWeatherUtilities::MakeResult
  u.make_point = GlaxWeatherUtilities::MakePoint
  u.make_spec = GlaxWeatherUtilities::MakeSpec
  u.make_url = GlaxWeatherUtilities::MakeUrl
  u.param = GlaxWeatherUtilities::Param
  u.prepare_auth = GlaxWeatherUtilities::PrepareAuth
  u.prepare_body = GlaxWeatherUtilities::PrepareBody
  u.prepare_headers = GlaxWeatherUtilities::PrepareHeaders
  u.prepare_method = GlaxWeatherUtilities::PrepareMethod
  u.prepare_params = GlaxWeatherUtilities::PrepareParams
  u.prepare_path = GlaxWeatherUtilities::PreparePath
  u.prepare_query = GlaxWeatherUtilities::PrepareQuery
  u.result_basic = GlaxWeatherUtilities::ResultBasic
  u.result_body = GlaxWeatherUtilities::ResultBody
  u.result_headers = GlaxWeatherUtilities::ResultHeaders
  u.transform_request = GlaxWeatherUtilities::TransformRequest
  u.transform_response = GlaxWeatherUtilities::TransformResponse
}
