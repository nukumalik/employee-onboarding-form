// OrganisationService.test.ts
import axios from 'axios'
import OrganisationService from './organisationService'
import {BASE_URL} from '../utils/common'
import {Organisation} from '../types/organitation'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('OrganisationService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches organisations successfully from an API', async () => {
    const mockData: Organisation[] = [
      {organisationKey: '1', organisationName: 'Org 1'},
      {organisationKey: '2', organisationName: 'Org 2'}
    ]
    mockedAxios.get.mockResolvedValueOnce({data: mockData})

    const result = await OrganisationService.getOrganisations('testQuery')

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/00691aae-692e-4028-bf0a-585147fca47b?q=testQuery`
    )
    expect(result).toEqual(mockData)
  })

  it('handles API errors correctly', async () => {
    const errorMessage = 'Network Error'
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

    await expect(OrganisationService.getOrganisations('testQuery')).rejects.toThrow(errorMessage)

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${BASE_URL}/00691aae-692e-4028-bf0a-585147fca47b?q=testQuery`
    )
  })
})
