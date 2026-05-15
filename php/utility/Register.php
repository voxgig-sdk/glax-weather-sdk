<?php
declare(strict_types=1);

// GlaxWeather SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GlaxWeatherUtility::setRegistrar(function (GlaxWeatherUtility $u): void {
    $u->clean = [GlaxWeatherClean::class, 'call'];
    $u->done = [GlaxWeatherDone::class, 'call'];
    $u->make_error = [GlaxWeatherMakeError::class, 'call'];
    $u->feature_add = [GlaxWeatherFeatureAdd::class, 'call'];
    $u->feature_hook = [GlaxWeatherFeatureHook::class, 'call'];
    $u->feature_init = [GlaxWeatherFeatureInit::class, 'call'];
    $u->fetcher = [GlaxWeatherFetcher::class, 'call'];
    $u->make_fetch_def = [GlaxWeatherMakeFetchDef::class, 'call'];
    $u->make_context = [GlaxWeatherMakeContext::class, 'call'];
    $u->make_options = [GlaxWeatherMakeOptions::class, 'call'];
    $u->make_request = [GlaxWeatherMakeRequest::class, 'call'];
    $u->make_response = [GlaxWeatherMakeResponse::class, 'call'];
    $u->make_result = [GlaxWeatherMakeResult::class, 'call'];
    $u->make_point = [GlaxWeatherMakePoint::class, 'call'];
    $u->make_spec = [GlaxWeatherMakeSpec::class, 'call'];
    $u->make_url = [GlaxWeatherMakeUrl::class, 'call'];
    $u->param = [GlaxWeatherParam::class, 'call'];
    $u->prepare_auth = [GlaxWeatherPrepareAuth::class, 'call'];
    $u->prepare_body = [GlaxWeatherPrepareBody::class, 'call'];
    $u->prepare_headers = [GlaxWeatherPrepareHeaders::class, 'call'];
    $u->prepare_method = [GlaxWeatherPrepareMethod::class, 'call'];
    $u->prepare_params = [GlaxWeatherPrepareParams::class, 'call'];
    $u->prepare_path = [GlaxWeatherPreparePath::class, 'call'];
    $u->prepare_query = [GlaxWeatherPrepareQuery::class, 'call'];
    $u->result_basic = [GlaxWeatherResultBasic::class, 'call'];
    $u->result_body = [GlaxWeatherResultBody::class, 'call'];
    $u->result_headers = [GlaxWeatherResultHeaders::class, 'call'];
    $u->transform_request = [GlaxWeatherTransformRequest::class, 'call'];
    $u->transform_response = [GlaxWeatherTransformResponse::class, 'call'];
});
