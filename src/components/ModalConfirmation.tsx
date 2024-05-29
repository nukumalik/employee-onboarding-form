import {Modal} from 'antd'
import React from 'react'

export type ModalConfirmationProps = {
  isOpen?: boolean
  onSubmit?: () => void
  onClose?: () => void
}

const ModalConfirmation = ({isOpen, onSubmit, onClose}: ModalConfirmationProps) => {
  return (
    <Modal title="Basic Modal" open={isOpen} onOk={onSubmit} onCancel={onClose}>
      <p>Are you sure you want to submit the data?</p>
    </Modal>
  )
}

export default ModalConfirmation
