export const calculateWeight = oz => {
  const OZ_PER_LB = 16
  const pounds = Math.floor(oz / OZ_PER_LB)
  const ounces = oz % OZ_PER_LB
  return `${pounds} pounds, ${ounces} ounces`
}

export const formatField = field => field.replace(/[A-Z]/, ' $&').toUpperCase()

export const isStatusSuccess = ({ status }) => status === STATUSES.SUCCESS

export const isStatusError = ({ status }) => status === STATUSES.ERROR

export const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}
