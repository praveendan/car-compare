import { Brand } from "./common.types"

export interface Response {
  status: number
  statusText: string
}

export interface ServerException {
  status: number
  message: string
}

export interface VehicleBrandData {
  brands: Brand[]
  status: Response
}