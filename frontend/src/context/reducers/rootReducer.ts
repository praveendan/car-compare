import { AppState } from '../types';
import { AppAction } from '../action.types';
import { modelReducer, initialModelState } from './modelReducer';
import { brandReducer, initialBrandState } from './brandReducer';
import { yearReducer, initialYearState } from './yearReducer';
import { initialTrimState, trimReducer } from './trimReducer';

export const initialAppState: AppState = {
  brandModelYearTrims: initialTrimState,
  brandModelYears: initialYearState,
  brandModels: initialModelState,
  brands: initialBrandState
};

export function rootReducer(state: AppState, action: AppAction): AppState {
  return {
    brandModelYearTrims: trimReducer(state.brandModelYearTrims, action as any),
    brandModelYears: yearReducer(state.brandModelYears, action as any),
    brandModels: modelReducer(state.brandModels, action as any),
    brands: brandReducer(state.brands, action as any),
  };
}
