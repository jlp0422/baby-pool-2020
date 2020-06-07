import styled from '@emotion/styled'
import axios from 'axios'
import { Link } from 'gatsby'
import React, { useReducer, useEffect } from 'react'
import EntryForm from '../../components/EntryForm'
import Layout from '../../components/Layout'
import Loading from '../../components/Loading'
import { H1, P } from '../../shared/styles'
import {
  formatField,
  isStatusError,
  isStatusPending,
  isStatusSuccess,
  getFormColor,
  STATUSES
} from '../../utils'

const ErrorCopy = styled(P)`
  color: red;
  font-weight: bold;
  font-size: ${props => props.size || '1.6rem'};
`

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 4px;
  border: 2px solid ${props => props.formColor};
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
    case 'RESET_FORM':
      return INITIAL_STATE
    default:
      return state
  }
}

const CreateEntry = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  useEffect(() => {
    dispatch({ type: 'RESET_FORM' })
  }, [location.state])

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
          copy: `Please fill out the ${formatField(field)} field`
        })
        return
      }
    }
    if (!state.date.match(/\d{4}-\d{2}-\d{2}/)) {
      return addError({
        field: 'date',
        copy: 'Date must be in YYYY-MM-DD format'
      })
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
          <Link to='/entries'>entries page</Link> to see all entries!!
        </P>
      )
    }

    return (
      <EntryForm
        handleSubmit={handleSubmit}
        updateFieldValue={updateFieldValue}
        state={state}
        formColor={getFormColor(state)}
      />
    )
  }

  const renderFormErrors = errors =>
    errors.map(({ field, copy }) => <ErrorCopy key={field}>{copy}</ErrorCopy>)

  return (
    <Layout>
      <H1>Guess the baby's birthday, gender, and&nbsp;weight!</H1>
      <FormContainer formColor={getFormColor(state)}>
        {renderFormErrors(state.errors)}
        {renderForm()}
      </FormContainer>
    </Layout>
  )
}

export default CreateEntry
