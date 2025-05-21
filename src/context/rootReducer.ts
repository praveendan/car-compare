import { AppState } from './types';
import { AppAction } from './action.types';
import { modelReducer, initialModelState } from './modelReducer';
import { brandReducer, initialBrandState } from './brandReducer';

export const initialAppState: AppState = {
  brandModels: initialModelState,
  brands: initialBrandState,
};

export function rootReducer(state: AppState, action: AppAction): AppState {
  return {
    brandModels: modelReducer(state.brandModels, action as any),
    brands: brandReducer(state.brands, action as any),
  };
}
