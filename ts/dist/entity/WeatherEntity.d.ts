import { GlaxWeatherEntityBase } from '../GlaxWeatherEntityBase';
import type { GlaxWeatherSDK } from '../GlaxWeatherSDK';
import type { Control } from '../types';
import type { Weather, WeatherLoadMatch, WeatherListMatch } from '../GlaxWeatherTypes';
declare class WeatherEntity extends GlaxWeatherEntityBase<Weather> {
    constructor(client: GlaxWeatherSDK, entopts: any);
    make(this: WeatherEntity): WeatherEntity;
    load(this: any, reqmatch?: WeatherLoadMatch, ctrl?: Control): Promise<WeatherEntity>;
    list(this: any, reqmatch?: WeatherListMatch, ctrl?: Control): Promise<WeatherEntity[]>;
}
export { WeatherEntity };
