import { BrandAction } from './action.types';
import { Brands } from './types';

export interface BrandState {
  brands: Brands
}

export const initialBrandState: BrandState = {
  brands: [],
};

export function brandReducer(state: BrandState, action: BrandAction): BrandState {
  switch (action.type) {
    case "ADD_BRANDS": {
      return {
        brands: state.brands.concat(action.payload)
      }
    }
    default: {
      return state
    }
  }
}
