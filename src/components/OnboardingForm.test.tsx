/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-wait-for-side-effects */
// src/components/OnboardingForm.test.tsx
import React from 'react'
import {render, screen} from '@testing-library/react'
import OnboardingForm, {OnboardingFormProps} from './OnboardingForm'
import '@testing-library/jest-dom/extend-expect'
import {UseQueryResult} from 'react-query'
import {Organisation} from '../types/organitation'
import {Department} from '../types/department'
import {Division} from '../types/division'

// Mock data
const organisations: UseQueryResult<Organisation[], unknown> = {
  data: [
    {organisationKey: '1', organisationName: 'Organisation 1'},
    {organisationKey: '2', organisationName: 'Organisation 2'}
  ],
  isFetching: false,
  isError: false,
  isSuccess: true
} as any

const departments: UseQueryResult<Department[], unknown> = {
  data: [
    {departmentKey: '1', departmentName: 'Department 1'},
    {departmentKey: '2', departmentName: 'Department 2'}
  ],
  isFetching: false,
  isError: false,
  isSuccess: true
} as any

const divisions: UseQueryResult<Division[], unknown> = {
  data: [
    {divisionKey: '1', divisionName: 'Division 1'},
    {divisionKey: '2', divisionName: 'Division 2'}
  ],
  isFetching: false,
  isError: false,
  isSuccess: true
} as any

const mockOnFinish = jest.fn()

const defaultProps: OnboardingFormProps = {
  onFinish: mockOnFinish
}

jest.mock('../hooks/useOnboardingForm', () => ({
  __esModule: true,
  default: () => ({
    orgKey: '',
    depKey: '',
    changeOrgKey: jest.fn(),
    changeDepKey: jest.fn(),
    organisations,
    departments,
    divisions
  })
}))

describe('OnboardingForm', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', () => {
    render(<OnboardingForm {...defaultProps} />)
    expect(screen.getByText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByText(/Photo/i)).toBeInTheDocument()
    expect(screen.getByText(/Organisation Name/i)).toBeInTheDocument()
    expect(screen.getByText('Department')).toBeInTheDocument()
    expect(screen.getByText('Division')).toBeInTheDocument()
    expect(screen.getByText(/Give employee their own login/i)).toBeInTheDocument()
    expect(screen.getByText(/Daily Spending Limit/i)).toBeInTheDocument()
  })
})
