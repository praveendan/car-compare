import { Brand, Model } from "../types/common.types";

export type ModelAction = { type: 'ADD_MODELS'; payload: Model[] }

export type BrandAction = { type: 'ADD_BRANDS', payload: Brand[] };

export type AppAction = ModelAction | BrandAction;
