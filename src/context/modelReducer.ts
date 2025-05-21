import { ModelAction } from './action.types';
import { BrandModels } from './types';

export interface ModelState {
  brandModels: BrandModels
}

export const initialModelState: ModelState = {
  brandModels: new Map()
};

export function modelReducer(state: ModelState, action: ModelAction): ModelState {
  switch (action.type) {
    case 'ADD_MODELS':
      if (action.payload.models.length === 0) {
        return state
      }

      const brand = action.payload.brand
      const brandModelsCopy = new Map(state.brandModels)

      if (brandModelsCopy.has(brand)) {
        const brandModels = brandModelsCopy.get(brand)!
        brandModels.push(...action.payload.models)
      }
      else {
        brandModelsCopy.set(brand, action.payload.models)
      }

      return {
        ...state,
        brandModels: brandModelsCopy
      }
    default:
      return state;
  }
}
