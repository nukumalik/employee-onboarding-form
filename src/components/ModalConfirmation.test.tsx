import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ModalConfirmation, {ModalConfirmationProps} from './ModalConfirmation'

describe('ModalConfirmation Component', () => {
  const defaultProps: ModalConfirmationProps = {
    isOpen: false,
    onSubmit: jest.fn(),
    onClose: jest.fn()
  }

  const renderComponent = (props = defaultProps) => render(<ModalConfirmation {...props} />)

  test('renders without crashing', () => {
    renderComponent()
    expect(
      screen.queryByText(/are you sure you want to submit the data\?/i)
    ).not.toBeInTheDocument()
  })

  test('shows modal when isOpen is true', () => {
    renderComponent({...defaultProps, isOpen: true})
    expect(screen.getByText(/are you sure you want to submit the data\?/i)).toBeInTheDocument()
  })

  test('calls onSubmit when OK button is clicked', () => {
    renderComponent({...defaultProps, isOpen: true})
    fireEvent.click(screen.getByRole('button', {name: /ok/i}))
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })

  test('calls onClose when Cancel button is clicked', () => {
    renderComponent({...defaultProps, isOpen: true})
    fireEvent.click(screen.getByRole('button', {name: /cancel/i}))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
})
