import { Model, Trim } from "../types/common.types";
import { Brands } from "./types";

export type TrimAction = { type: 'ADD_TRIM'; payload: { brandModelYear: string; trims: Trim[] } }

export type YearAction = { type: 'ADD_YEARS'; payload: { brandModel: string; years: string[] } }

export type ModelAction = { type: 'ADD_MODELS'; payload: { brand: string; models: Model[] } }

export type BrandAction = { type: 'ADD_BRANDS', payload: Brands };

export type AppAction = ModelAction | BrandAction | YearAction | TrimAction;
