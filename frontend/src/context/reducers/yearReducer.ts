import { YearAction } from '../action.types';
import { BrandModelYears } from '../types';

export interface YearState {
  brandModelYears: BrandModelYears
}

export const initialYearState: YearState = {
  brandModelYears: new Map<string, string[]>()
};

export function yearReducer(state: YearState, action: YearAction): YearState {
  switch (action.type) {
    case 'ADD_YEARS':
      if (action.payload.years.length === 0) {
        return state
      }

      const brandModel = action.payload.brandModel
      const brandModelYearsCopy = new Map(state.brandModelYears)

      if (brandModelYearsCopy.has(brandModel)) {
        const brandModels = brandModelYearsCopy.get(brandModel)!
        brandModels.push(...action.payload.years)
      }
      else {
        brandModelYearsCopy.set(brandModel, action.payload.years)
      }

      return {
        ...state,
        brandModelYears: brandModelYearsCopy
      }
    default:
      return state;
  }
}
