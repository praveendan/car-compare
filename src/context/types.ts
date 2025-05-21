import { Brand, Model } from "../types/common.types";

export type BrandModels = Map<string, Model[]>
export type Brands = Brand[]

interface ModelState {
  brandModels: BrandModels
}

interface BrandState {
  brands: Brands
}

export interface AppState {
  brandModels: ModelState;
  brands: BrandState;
}
