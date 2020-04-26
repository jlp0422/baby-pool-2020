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

const removeStartingZeroes = numString => numString.replace(/^0/, '')

export const formatDate = date => {
  const [year, month, day] = date.split('-')
  return `${removeStartingZeroes(month)}/${removeStartingZeroes(day)}/${year}`
}

export const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

export const isAscending = direction => direction === '+'
export const isDate = property => property === 'date'
export const isWeight = property => property === 'weight'

export const flipSort = currentSort => {
  const direction = currentSort.slice(0, 1)
  const property = currentSort.slice(1)
  const newDir = isAscending(direction) ? '-' : '+'
  return `${newDir}${property}`
}
