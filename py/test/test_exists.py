# ProjectName SDK exists test

import pytest
from glaxweather_sdk import GlaxWeatherSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = GlaxWeatherSDK.test(None, None)
        assert testsdk is not None
