import axios from 'axios'
import React, { useReducer } from 'react'
import {
  formatField,
  isStatusSuccess,
  isStatusError,
  STATUSES
} from '../../utils'
import EntryForm from '../../components/EntryForm'
import Layout from '../../components/Layout'
import styled from '@emotion/styled'

const P = styled.p`
  font-size: 1.6rem;
`

const ErrorCopy = styled(P)`
  color: red;
  font-weight: bold;
  font-size: ${props => props.size || '1.6rem'}
`

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

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
      .post('/api/create-entry', state)
      .then(() => {
        setStatus(STATUSES.SUCCESS)
        dispatch({ type: 'SUCCESSFUL_SUBMISSION' })
      })
      .catch(error => {
        console.error(error)
        setStatus(STATUSES.ERROR)
      })
  }

  const renderForm = () => {
    if (isStatusError(state)) {
      return <ErrorCopy size="2rem">Error submitting entry. Refresh and try again!</ErrorCopy>
    }

    if (isStatusSuccess(state)) {
      return (
        <P>
          Congrats! your entry has been successfully created. Check your email
          for confirmation!
        </P>
      )
    }
    return (
      <EntryForm
        handleSubmit={handleSubmit}
        updateFieldValue={updateFieldValue}
        state={state}
      />
    )
  }

  const renderFormErrors = errors =>
    errors.map(({ field, value }) => (
      <ErrorCopy key={field}>Please fill out the {value} field</ErrorCopy>
    ))

  return (
    <Layout>
      <H1>Guess the baby's birthday, gender, and weight!</H1>
      {renderFormErrors(state.errors)}
      {renderForm()}
    </Layout>
  )
}

export default CreateEntry
