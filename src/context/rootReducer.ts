import { AppState } from './types';
import { AppAction } from './actionTypes';
import { authReducer, initialAuthState } from './modelReducer';
import { brandReducer, initialBrandState } from './brandReducer';

export const initialAppState: AppState = {
  brandModels: initialAuthState,
  brands: initialBrandState,
};

export function rootReducer(state: AppState, action: AppAction): AppState {
  return {
    brandModels: authReducer(state.brandModels, action as any),
    brands: brandReducer(state.brands, action as any),
  };
}
