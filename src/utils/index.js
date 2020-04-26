export const calculateWeight = oz => {
  const OZ_PER_LB = 16
  const pounds = Math.floor(oz / OZ_PER_LB)
  const ounces = oz % OZ_PER_LB
  return `${pounds} pounds, ${ounces} ounces`
}

export const formatField = field => field.replace(/[A-Z]/, ' $&').toUpperCase()

export const capitalizeWord = word => {
  const firstLetter = word.slice(0, 1)
  const remaining = word.slice(1)
  return `${firstLetter.toUpperCase()}${remaining.toLowerCase()}`
}

export const isStatusSuccess = ({ status }) => status === STATUSES.SUCCESS
export const isStatusError = ({ status }) => status === STATUSES.ERROR
export const isStatusPending = ({ status }) => status === STATUSES.PENDING

export const formatDate = date => {
  const [year, month, day] = date.split('-')
  return `${removeZeroes(month)}/${removeZeroes(day)}/${year}`
}

const removeZeroes = numString => numString.split('').filter(Number).join('')

export const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}
