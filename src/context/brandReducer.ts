import { Brand } from '../types/common.types';
import { BrandAction } from './action.types';

export interface BrandState {
  brands: Brand[]
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
      throw Error("Unknown action: " + action.type);
    }
  }
}
