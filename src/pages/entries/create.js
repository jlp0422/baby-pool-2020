import axios from 'axios'
import React, { useReducer } from 'react'
import {
  calculateWeight,
  formatField,
  STATUSES,
  isStatusSuccess
} from '../../utils'

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
    case 'SUCCESSFUL_SUBMISSION':
      return { ...state, status: STATUSES.SUCCESS }
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
        return
      }
    }
    createEntryInDatabase()
  }

  const createEntryInDatabase = async () => {
    setStatus(STATUSES.PENDING)
    await axios
      .post('/api/createEntry', state)
      .then(response => {
        console.log('*** response', response)
        if (response.status === 200) {
          setStatus(STATUSES.SUCCESS)
          dispatch({ type: 'SUCCESSFUL_SUBMISSION' })
        }
      })
      .catch(console.error)
  }

  const createFormField = ({ label, name, type = 'text', options = {} }) => (
    <label>
      {label}
      <input
        type={type}
        name={name}
        value={state[name]}
        {...options}
        onChange={updateFieldValue(name)}
      />
    </label>
  )

  return (
    <div>
      <h1>create an entry!</h1>
      <p>status: {state.status}</p>
      {state.errors.map(({ field, value }) => (
        <p key={field} style={{ color: 'red', fontWeight: 'bold' }}>
          Please fill out the {value} field
        </p>
      ))}
      {isStatusSuccess(state) ? (
        <p>
          congrats! your entry has been successfully created. check your email
          for confirmation!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          {createFormField({
            label: 'First Name',
            name: 'firstName'
          })}
          {createFormField({
            label: 'Last Name',
            name: 'lastName'
          })}
          {createFormField({
            label: 'Email',
            name: 'email',
            type: 'emai'
          })}
          {createFormField({
            label: 'Date',
            name: 'date',
            type: 'date',
            options: {
              min: '2020-07-01',
              max: '2020-09-01'
            }
          })}
          <label>
            Gender
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
          </label>
          {createFormField({
            label: 'Weight',
            name: 'weight',
            type: 'range',
            options: {
              min: '64',
              max: '160'
            }
          })}
          {calculateWeight(state.weight)}
          <button type='submit'>Submit entry!</button>
        </form>
      )}
    </div>
  )
}

export default CreateEntry
