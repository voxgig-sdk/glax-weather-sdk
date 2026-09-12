export interface Weather {
    conditions?: string;
    forecast?: any[];
    location?: string;
    temperature?: number;
    units?: string;
}
export interface WeatherLoadMatch {
    forecast?: boolean;
    lat?: number;
    location?: string;
    lon?: number;
    unit?: string;
}
export interface WeatherListMatch {
    forecast?: boolean;
    lat?: number;
    location?: string;
    lon?: number;
    unit?: string;
}
