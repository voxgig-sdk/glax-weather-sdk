"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlaxWeatherError = void 0;
class GlaxWeatherError extends Error {
    isGlaxWeatherError = true;
    sdk = 'GlaxWeather';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GlaxWeatherError = GlaxWeatherError;
//# sourceMappingURL=GlaxWeatherError.js.map