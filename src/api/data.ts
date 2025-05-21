import axios from "axios";
import { API } from "../config";
import { ServerException, VehicleBrandData } from "../types/api.types";
import { AppAction } from "../context/action.types";
import { AppState } from "../context/types";

export const getVehicleBrandData = async (): Promise<VehicleBrandData> => {
  const data: VehicleBrandData = {
    brands: [],
    status: {
      status: 0,
      statusText: ""
    }
  }
  try {
    const resData = await axios.get(`${API}/api/makes`, {
      params: {
        sort: 'name',
        direction: 'asc'
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

export const loadAndSetModelData = async (brandName: string, state: AppState, dispatch: React.Dispatch<AppAction>) => {
  if (!state.brandModels.brandModels.has(brandName)) {
    try {
      const resData = await axios.get(`${API}/api/models`, {
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