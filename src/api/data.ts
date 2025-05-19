import axios from "axios";
import { API } from "../config";
import { ServerException, VehicleBrandData } from "../types/api.types";

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