import { Brand, Model, Trim } from "../types/common.types";

export type BrandModelYearTrims = Map<string, Trim[]>
export type BrandModelYears = Map<string, string[]>
export type BrandModels = Map<string, Model[]>
export type Brands = Brand[]

interface TrimState {
  brandModelYearTrims: BrandModelYearTrims
}

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
  brandModelYearTrims: TrimState;
  brandModelYears: YearState;
  brandModels: ModelState;
  brands: BrandState;
}
