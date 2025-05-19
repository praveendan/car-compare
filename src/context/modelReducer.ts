import { Model } from '../types/common.types';
import { ModelAction } from './actionTypes';

export interface ModelState {
  brandModels: Map<number, Model[]>
}

export const initialAuthState: ModelState = {
  brandModels: new Map()
};

export function authReducer(state: ModelState, action: ModelAction): ModelState {
  switch (action.type) {
    case 'ADD_MODELS':
      if (action.payload.length === 0) {
        return state
      }

      const makeId = action.payload[0].makeId
      const brandModelsCopy = new Map(state.brandModels)

      if (brandModelsCopy.has(makeId)) {
        const brandModels = brandModelsCopy.get(makeId)!
        brandModels.push(...action.payload)
        brandModelsCopy.set(makeId, brandModels)
      }
      else {
        brandModelsCopy.set(makeId, action.payload)
      }

      return {
        ...state,
        brandModels: brandModelsCopy
      }
    default:
      return state;
  }
}
