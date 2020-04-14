import React from 'react'
import { useReducer } from 'react'

const STATUSES = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  gender: '',
  weight: 0,
  status: STATUSES.IDLE,
  errors: []
}

const OZ_PER_LB = 16

const calculateWeight = oz => {
  const pounds = Math.floor(oz / OZ_PER_LB)
  const ounces = oz % OZ_PER_LB
  return `${pounds} pounds, ${ounces} ounces`
}

const formatField = field =>
  field.replace(/[A-Z]/, ' $&').replace(/^\w{1}/, match => match.toUpperCase())

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD_VALUE':
      return { ...state, [action.field]: action.value }
    case 'UPDATE_STATUS':
      return { ...state, status: action.status }
    case 'ADD_ERROR':
      return { ...state, errors: [...state.errors, action.error] }
    case 'RESET_ERRORS':
      return { ...state, errors: [] }
    default:
      return state
  }
}

const CreateEntry = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const setStatus = status => dispatch({ type: 'UPDATE_STATUS', status })
  const addError = error => dispatch({ type: 'ADD_ERROR', error })
  const resetErrors = () => dispatch({ type: 'RESET_ERRORS' })

  const updateFieldValue = field => ev =>
    dispatch({
      type: 'UPDATE_FIELD_VALUE',
      value: ev.target.value,
      field
    })

  const handleSubmit = ev => {
    ev.preventDefault()
    resetErrors()
    for (let [field, value] of Object.entries(state)) {
      if (!value) {
        addError({
          field,
          value: formatField(field)
        })
      }
    }
    setStatus(STATUSES.PENDING)
    setTimeout(() => {
      setStatus(STATUSES.SUCCESS)
    }, 1000)
  }

  return (
    <div>
      <h1>create an entry!</h1>
      <p>status: {state.status}</p>
      {state.errors.map(({ field, value }) => (
        <p key={field} style={{ color: 'red', fontWeight: 'bold' }}>
          Please fill out the {value} field
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type='text'
          name='firstName'
          value={state.firstName}
          onChange={updateFieldValue('firstName')}
        />
        <label>Last Name</label>
        <input
          type='text'
          name='lastName'
          value={state.lastName}
          onChange={updateFieldValue('lastName')}
        />
        <label>Email</label>
        <input
          type='email'
          name='email'
          value={state.email}
          onChange={updateFieldValue('email')}
        />
        <label>Date</label>
        <input
          type='date'
          name='date'
          min='2020-07-01'
          max='2020-10-01'
          value={state.date}
          onChange={updateFieldValue('date')}
        />
        <label>Gender</label>
        <select
          name='gender'
          value={state.gender}
          onChange={updateFieldValue('gender')}
        >
          <option defaultValue value={''} disabled={state.gender}>
            -
          </option>
          <option value='MALE'>M</option>
          <option value='FEMALE'>F</option>
        </select>
        <label>Weight</label>
        <input
          type='range'
          name='weight'
          min='64'
          max='160'
          value={state.weight}
          onChange={updateFieldValue('weight')}
        />
        {calculateWeight(state.weight)}
        <button type='submit'>Submit entry!</button>
      </form>
    </div>
  )
}

export default CreateEntry
