import { Brand, Model } from "../types/common.types";

interface ModelState {
  brandModels: Map<number, Model[]>;
}

interface BrandState {
  brands: Brand[];
}

export interface AppState {
  brandModels: ModelState;
  brands: BrandState;
}
