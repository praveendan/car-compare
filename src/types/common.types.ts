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