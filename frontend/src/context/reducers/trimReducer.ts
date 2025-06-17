import { Trim } from '../../types/common.types';
import { TrimAction } from '../action.types';
import { BrandModelYearTrims } from '../types';

export interface TrimState {
  brandModelYearTrims: BrandModelYearTrims
}

export const initialTrimState: TrimState = {
  brandModelYearTrims: new Map<string, Trim[]>()
};

export function trimReducer(state: TrimState, action: TrimAction): TrimState {
  switch (action.type) {
    case 'ADD_TRIM':
      if (action.payload.trims.length === 0) {
        return state
      }

      const brandModelYear = action.payload.brandModelYear
      const brandModelYearTrimsCopy = new Map(state.brandModelYearTrims)

      if (brandModelYearTrimsCopy.has(brandModelYear)) {
        const brandModelYearTrims = brandModelYearTrimsCopy.get(brandModelYear)!
        brandModelYearTrims.push(...action.payload.trims)
      }
      else {
        brandModelYearTrimsCopy.set(brandModelYear, action.payload.trims)
      }

      return {
        ...state,
        brandModelYearTrims: brandModelYearTrimsCopy
      }
    default:
      return state;
  }
}
