import { Model } from "../types/common.types";
import { Brands } from "./types";

export type ModelAction = { type: 'ADD_MODELS'; payload: { brand: string; models: Model[] } }

export type BrandAction = { type: 'ADD_BRANDS', payload: Brands };

export type AppAction = ModelAction | BrandAction;
