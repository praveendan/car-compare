interface Common {
  id: number
  name: string
}

export interface Brand extends Common{ }

export interface Model extends Common { }

export interface Trim extends Common {
  make_model_id: number
  year: number
  description: string
  msrp: string
  invoice: string
}

export type Color = {
  name: string
  rgb: string
}

export interface TrimSpecs {
  //trimId: string
  body: {
    curbWeight: number
    doors: number
    grossWeight: number
    height: string
    length: string
    maxPayload: number
    maxTowingCapacity: number
    seats: number
    type: string
    wheelBase: string
  }
  driveType: string
  engine: {
    camType: string
    cylinders: string
    engineType: string
    fuel: string
    hp: number
    hpRpm: number
    litres: number
  }
  colors: Color[]
  interiorColors: Color[]
  mileage: {
    epaCity: number
    epaHwy: number
    epaCombined: number
    tankSize: string
    cityRange: number
    hwyRange: number
    epaCityE: number
    epaHwyE: number
    epaCombinedE: number
    batteryCapacity: number
    chargingTIme: string
  }
  transmissions: string[]
}