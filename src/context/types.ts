import { Brand, Model } from "../types/common.types";

export type BrandModelYears = Map<string, string[]>
export type BrandModels = Map<string, Model[]>
export type Brands = Brand[]

interface YearState {
  brandModelYears: BrandModelYears
}

interface ModelState {
  brandModels: BrandModels
}

interface BrandState {
  brands: Brands
}

export interface AppState {
  brandModelYears: YearState;
  brandModels: ModelState;
  brands: BrandState;
}
