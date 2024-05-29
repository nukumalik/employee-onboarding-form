import axios from 'axios'
import {BASE_URL} from '../utils/common'

class OrganisationService {
  static async getOrganisations(q?: string) {
    const response = await axios.get(`${BASE_URL}/00691aae-692e-4028-bf0a-585147fca47b?q=${q}`)
    const data = await response.data
    return data
  }
}

export default OrganisationService
