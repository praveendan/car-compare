export const getTrimStorageKey = (brand: string, model: string, year: string) => {
  return `${brand}_${model}_${year}`
}

export const getYearStorageKey = (brand: string, model: string) => {
  return `${brand}_${model}`
}