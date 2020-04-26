import styled from '@emotion/styled'
import axios from 'axios'
import { Link } from 'gatsby'
import React, { useReducer } from 'react'
import EntryForm from '../../components/EntryForm'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import {
  formatField,
  isStatusError,
  isStatusPending,
  isStatusSuccess,
  STATUSES
} from '../../utils'

const P = styled.p`
  font-size: 1.6rem;
  > a {
    text-decoration: underline;
    font-weight: bold;
    color: #00bfff;
  }
`

const ErrorCopy = styled(P)`
  color: red;
  font-weight: bold;
  font-size: ${props => props.size || '1.6rem'};
`

const H1 = styled.h1`
  font-size: 2rem;
  text-align: center;
`

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
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
    if (isStatusPending(state)) {
      return <Loading />
    }

    if (isStatusError(state)) {
      return (
        <ErrorCopy size='2rem'>
          Error submitting entry. Refresh and try again!
        </ErrorCopy>
      )
    }

    if (isStatusSuccess(state)) {
      return (
        <P>
          Congrats! Your entry has been successfully created. Check the{' '}
          <Link to='/entries/'>entries page</Link> to see all entries!!
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
