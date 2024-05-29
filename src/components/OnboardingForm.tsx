import {PlusOutlined} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
  Upload
} from 'antd'
import type {GetProp, UploadFile, UploadProps} from 'antd'
import React, {useState} from 'react'
import useOnboardingForm from '../hooks/useOnboardingForm'
import ModalConfirmation from './ModalConfirmation'

const normFile = (e: any) => {
  console.log('Upload event:', e)
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

export type OnboardingFormProps = {
  onFinish: (value: any) => void
}

const OnboardingForm = ({onFinish}: OnboardingFormProps) => {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [giveLogin, setGiveLogin] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const {organisations, departments, divisions, orgKey, depKey, changeOrgKey, changeDepKey} =
    useOnboardingForm()
  const [form] = Form.useForm()

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url ?? (file.preview as string))
    setPreviewOpen(true)
  }

  const handleShowConfirmation = (value: any) => {
    setShowConfirmation(true)
    setFormData(value)
  }

  const handleConfirm = () => {
    setShowConfirmation(false)
    form.resetFields()
    onFinish(formData)
    console.log(form.getFieldsValue())
  }

  return (
    <Card title={<Typography.Title level={2}>Onboarding Form</Typography.Title>} bordered={false}>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleShowConfirmation}
      >
        <Row gutter={[10, 5]}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{required: true, message: 'First Name is required'}]}
              className="flex-1"
            >
              <Input className="flex-1" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{required: true, message: 'Last Name is required'}]}
              className="flex-1"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Photo" valuePropName="fileList" getValueFromEvent={normFile}>
              <Upload
                multiple={false}
                listType="picture-card"
                maxCount={1}
                onPreview={handlePreview}
              >
                <button style={{border: 0, background: 'none'}} type="button">
                  <PlusOutlined />
                  <div style={{marginTop: 8}}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="orgKey"
              label="Organisation Name"
              rules={[{required: true, message: 'Organisation Name is required'}]}
              className="flex-1"
            >
              <Select
                placeholder="Select an organisation"
                onChange={changeOrgKey}
                options={organisations?.data?.map(({organisationKey, organisationName}) => ({
                  value: organisationKey,
                  label: organisationName
                }))}
                loading={organisations.isFetching}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="depKey"
              label="Department"
              rules={[{required: true, message: 'Department is required'}]}
              className="flex-1"
            >
              <Select
                key={orgKey}
                placeholder="Select an department"
                onChange={changeDepKey}
                options={departments?.data?.map(({departmentKey, departmentName}) => ({
                  value: departmentKey,
                  label: departmentName
                }))}
                loading={departments.isFetching}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="divKey"
              label="Division"
              rules={[{required: true, message: 'Division is required'}]}
              className="flex-1"
            >
              <Select
                key={depKey}
                placeholder="Select an division"
                options={divisions?.data?.map(({divisionKey, divisionName}) => ({
                  value: divisionKey,
                  label: divisionName
                }))}
                loading={divisions.isFetching}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="giveLogin"
              label="Give employee their own login"
              valuePropName="checked"
            >
              <Switch onChange={setGiveLogin} />
            </Form.Item>
            {giveLogin && (
              <Form.Item
                name="email"
                label="Email"
                rules={[{required: true, type: 'email', message: 'Valid email is required'}]}
              >
                <Input />
              </Form.Item>
            )}
          </Col>
          <Col span={24}>
            <Form.Item name="dailySpendingLimit" label="Daily Spending Limit" initialValue={0}>
              <InputNumber min={0} />
            </Form.Item>
          </Col>
          <Col span={4} offset={20}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <ModalConfirmation
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onSubmit={handleConfirm}
      />

      {previewImage && (
        <Image
          wrapperStyle={{display: 'none'}}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </Card>
  )
}

export default OnboardingForm
