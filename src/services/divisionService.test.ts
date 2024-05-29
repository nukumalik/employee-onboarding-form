// DivisionService.test.ts
import axios from 'axios'
import DivisionService from './divisionService'
import {BASE_URL} from '../utils/common'
import {Division} from '../types/division'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('DivisionService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches divisions successfully from an API', async () => {
    const mockData: Division[] = [
      {divisionId: '1', divisionKey: 'HR', divisionName: 'Human Resources'},
      {divisionId: '2', divisionKey: 'ENG', divisionName: 'Engineering'}
    ]
    mockedAxios.get.mockResolvedValueOnce({data: mockData})

    const result = await DivisionService.getDivisions('testDepKey')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/2f6727dd-6fd2-4069-9b84-a15b5dcf2383?departmentKey=testDepKey`
    )
    expect(result).toEqual(mockData)
  })

  it('handles API errors correctly', async () => {
    const errorMessage = 'Network Error'
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

    await expect(DivisionService.getDivisions('testDepKey')).rejects.toThrow(errorMessage)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/2f6727dd-6fd2-4069-9b84-a15b5dcf2383?departmentKey=testDepKey`
    )
  })
})
