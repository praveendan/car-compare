import axios from "axios";
import { API } from "../config";
import { ServerException, VehicleBrandData } from "../types/api.types";
import { AppAction } from "../context/action.types";
import { AppState } from "../context/types";
import { getTrimStorageKey, getYearStorageKey } from "../context/helpers";

/**
 * 
 * @returns brands
 */
export const getVehicleBrandData = async (): Promise<VehicleBrandData> => {
  const data: VehicleBrandData = {
    brands: [],
    status: {
      status: 0,
      statusText: ""
    }
  }
  try {
    const resData = await axios.get(`${API}/api/makes/v2`, {
      params: {
        sort: 'Makes.name'
      }
    })

    data.brands = resData.data.data
    data.status = {
      status: resData.status,
      statusText: resData.statusText
    }
  } catch (e: unknown ) {
    if (e instanceof Error) {
      const error = e as unknown as ServerException
      data.status = {
        status: error.status,
        statusText: error.message
      }
    } else {
      data.status.statusText = 'Unknown Error'
    }
    
  }

  return data
}

/**
 * 
 * @param brandName brand name
 * @param state current context
 * @param dispatch set the current context
 * This will fetch model data from the cache. if it does not exist, it will fetch from the server
 */
export const loadAndSetModelData = async (brandName: string, state: AppState, dispatch: React.Dispatch<AppAction>) => {
  if (!state.brandModels.brandModels.has(brandName)) {
    try {
      const resData = await axios.get(`${API}/api/models/v2`, {
        params: {
          make: brandName,
        }
      })

      dispatch({
        type: "ADD_MODELS",
        payload: {
          brand: brandName,
          models: resData.data.data
        }
      })
    } catch (e: unknown) {
      dispatch({
        type: "ADD_MODELS",
        payload: {
          brand: brandName,
          models: []
        }
      })
    }
  }
}

export const loadAndSetModelYearData = async (brandName: string, model: string, state: AppState, dispatch: React.Dispatch<AppAction>) => {
  if (!state.brandModelYears.brandModelYears.has(getYearStorageKey(brandName, model))) {
    try {
      const resData = await axios.get(`${API}/api/years/v2`, {
        params: {
          make: brandName,
          make_model_id: model,
        }
      })

      dispatch({
        type: "ADD_YEARS",
        payload: {
          brandModel: getYearStorageKey(brandName, model),
          years: resData.data
        }
      })
    } catch (e: unknown) {
      dispatch({
        type: "ADD_YEARS",
        payload: {
          brandModel: getYearStorageKey(brandName, model),
          years: []
        }
      })
    }
  }
}

export const loadAndSetModelYearTrimData = async (brandName: string, model: string, year: string, state: AppState, dispatch: React.Dispatch<AppAction>) => {
  if (!state.brandModelYearTrims.brandModelYearTrims.has(getTrimStorageKey(brandName, model, year))) {
    try {
      const resData = await axios.get(`${API}/api/trims/v2`, {
        params: {
          year,
          make: brandName,
          model_id: model,
        }
      })
      console.log(resData.data.data)

      dispatch({
        type: "ADD_TRIM",
        payload: {
          brandModelYear: getTrimStorageKey(brandName, model, year),
          trims: resData.data.data
        }
      })
    } catch (e: unknown) {
      dispatch({
        type: "ADD_TRIM",
        payload: {
          brandModelYear: getTrimStorageKey(brandName, model, year),
          trims: []
        }
      })
    }
  }
}
