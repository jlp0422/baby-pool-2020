import React from 'react'
import { calculateWeight } from '../utils'
import {
  Form,
  FormButton,
  FormContent,
  FormInput,
  FormInputDate,
  FormInputRange,
  FormLabel,
  FormSelect
} from './EntryForm.styles'

const getInput = type => {
  switch (type) {
    case 'range':
      return FormInputRange
    case 'date':
      return FormInputDate
    default:
      return FormInput
  }
}

const EntryForm = ({ handleSubmit, state, updateFieldValue }) => {
  const createFormField = ({
    label,
    name,
    type = 'text',
    options = {},
    placeholder = ''
  }) => {
    const Input = getInput(type)
    return (
      <FormLabel>
        {label}
        <Input
          type={type}
          name={name}
          value={state[name]}
          {...options}
          placeholder={placeholder}
          onChange={updateFieldValue(name)}
        />
      </FormLabel>
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormContent>
        {createFormField({
          label: 'First Name',
          name: 'firstName'
        })}
        {createFormField({
          label: 'Last Name',
          name: 'lastName'
        })}
        {createFormField({
          label: 'Birthday (Due date: 7/23)',
          name: 'date',
          type: 'date',
          options: {
            min: '2020-07-01',
            max: '2020-09-01'
          },
          placeholder: 'yyyy-mm-dd'
        })}
        <FormLabel>
          Gender
          <FormSelect
            name='gender'
            value={state.gender}
            onChange={updateFieldValue('gender')}
          >
            <option defaultValue value={''} disabled={state.gender}>
              -
            </option>
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
          </FormSelect>
        </FormLabel>
        {createFormField({
          label: 'Weight',
          name: 'weight',
          type: 'range',
          options: {
            min: '64',
            max: '160'
          }
        })}
        <p>{calculateWeight(state.weight)}</p>
      </FormContent>
      <FormButton type='submit'>Submit!</FormButton>
    </Form>
  )
}

export default EntryForm
