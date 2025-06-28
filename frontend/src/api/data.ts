import axios from "axios";
import { ServerException, VehicleBrandData } from "../types/api.types";
import { AppAction } from "../context/action.types";
import { AppState } from "../context/types";
import { getTrimStorageKey, getYearStorageKey } from "../context/helpers";
import { TrimSpecs } from "../types/common.types";
import { generateHmacSignature } from "./generateHmacSignature";

const API = process.env.HOST!
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
    const { timestamp, signature } = generateHmacSignature(process.env.REACT_APP_SECRET!);

    const resData = await axios.get(`${API}/api/makes/v2`, {
      headers: {
        'x-signature': signature,
        'x-timestamp': timestamp
      },
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
      const { timestamp, signature } = generateHmacSignature(process.env.REACT_APP_SECRET!);

      const resData = await axios.get(`${API}/api/models/v2`, {
        headers: {
          'x-signature': signature,
          'x-timestamp': timestamp
        },
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
      const { timestamp, signature } = generateHmacSignature(process.env.REACT_APP_SECRET!);

      const resData = await axios.get(`${API}/api/years/v2`, {
        headers: {
          'x-signature': signature,
          'x-timestamp': timestamp
        },
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
      const { timestamp, signature } = generateHmacSignature(process.env.REACT_APP_SECRET!);

      const resData = await axios.get(`${API}/api/trims/v2`, {
        headers: {
          'x-signature': signature,
          'x-timestamp': timestamp
        },
        params: {
          year,
          make: brandName,
          model_id: model,
        }
      })

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


export const getComprisons = async (ids: string[]) => {
  const trimSpecData = new Map<string, TrimSpecs>()

  try {
    const { timestamp, signature } = generateHmacSignature(process.env.REACT_APP_SECRET!);

    const res = await Promise.all(ids.map(id => axios.get(`${API}/api/trims/v2/${id}`, {
      headers: {
        'x-signature': signature,
        'x-timestamp': timestamp
      }
    })))
    res.forEach((item, i) => {
      const data = item.data
      const body = data.bodies[0]
      const engine = data.engines[0]
      const mileage = data.mileages[0]

      const getMappedColors = (colors: { name: string; rgb: string; }[]) => {
        return colors.map((col: { name: string; rgb: string; }) => {
          return {
            name: col.name,
            rgb: col.rgb
          }
        })
      }

      const mappedData: TrimSpecs = {
        body: {
          curbWeight: body.curb_weight,
          doors: body.doors,
          grossWeight: body.gross_weight,
          height: body.height,
          length: body.length,
          maxPayload: body.max_payload,
          maxTowingCapacity: body.max_towing_capacity,
          seats: body.seats,
          type: body.type,
          wheelBase: body.wheel_base
        },
        driveType: data.drive_types[0].description,
        engine: {
          camType: engine.cam_type,
          cylinders: engine.cylinders,
          engineType: engine.engine_type,
          fuel: engine.fuel_type,
          hp: engine.horsepower_hp,
          hpRpm: engine.horsepower_rpm,
          litres: engine.size
        },
        colors: getMappedColors(data.exterior_colors),
        interiorColors: getMappedColors(data.interior_colors),
        mileage: {
          epaCity: mileage.epa_city_mpg,
          epaHwy: mileage.epa_highway_mpg,
          epaCombined: mileage.combined_mpg,
          tankSize: mileage.fuel_tank_capacity,
          cityRange: mileage.range_city,
          hwyRange: mileage.range_highway,
          epaCityE: mileage.epa_city_mpg_electric,
          epaHwyE: mileage.epa_highway_mpg_electric,
          epaCombinedE: mileage.epa_combined_mpg_electric,
          batteryCapacity: mileage.battery_capacity_electric,
          chargingTIme: mileage.epa_time_to_charge_hr_240v_electric
        },
        transmissions: data.transmissions.map((trans: { description: string; }) => trans.description)
      }

      trimSpecData.set(ids[i], mappedData)
    })

  } catch (e) {
    console.log(e)
  } finally {
    return trimSpecData
  }
}