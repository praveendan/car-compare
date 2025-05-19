import { Brand, Model } from "../types/common.types";

interface AuthState {
  brandModels: Map<number, Model[]>;
}

interface ThemeState {
  brands: Brand[];
}

export interface AppState {
  brandModels: AuthState;
  brands: ThemeState;
}
