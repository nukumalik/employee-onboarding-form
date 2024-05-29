// DepartmentService.test.ts
import axios from 'axios'
import DepartmentService from './departmentService'
import {BASE_URL} from '../utils/common'
import {Department} from '../types/department'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('DepartmentService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches departments successfully from an API', async () => {
    const mockData: Department[] = [
      {departmentKey: '1', departmentName: 'HR'},
      {departmentKey: '2', departmentName: 'Engineering'}
    ]
    mockedAxios.get.mockResolvedValueOnce({data: mockData})

    const result = await DepartmentService.getDepartments('testOrgKey')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/ce9708e8-9595-49e0-a577-cafec3ac3a28?orgKey=testOrgKey`
    )
    expect(result).toEqual(mockData)
  })

  it('fetches departments with empty orgKey successfully from an API', async () => {
    const mockData: Department[] = [
      {departmentKey: '1', departmentName: 'HR'},
      {departmentKey: '2', departmentName: 'Engineering'}
    ]
    mockedAxios.get.mockResolvedValueOnce({data: mockData})

    const result = await DepartmentService.getDepartments()

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/ce9708e8-9595-49e0-a577-cafec3ac3a28?orgKey=undefined`
    )
    expect(result).toEqual(mockData)
  })

  it('handles API errors correctly', async () => {
    const errorMessage = 'Network Error'
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

    await expect(DepartmentService.getDepartments('testOrgKey')).rejects.toThrow(errorMessage)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/ce9708e8-9595-49e0-a577-cafec3ac3a28?orgKey=testOrgKey`
    )
  })
})
