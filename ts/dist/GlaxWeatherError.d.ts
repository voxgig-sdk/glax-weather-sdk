import { Context } from './Context';
declare class GlaxWeatherError extends Error {
    isGlaxWeatherError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { GlaxWeatherError };
