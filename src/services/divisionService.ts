import axios from 'axios'
import {BASE_URL} from '../utils/common'

class DivisionService {
  static async getDivisions(depKey?: string) {
    const response = await axios.get(
      `${BASE_URL}/2f6727dd-6fd2-4069-9b84-a15b5dcf2383?departmentKey=${depKey}`
    )
    const data = await response.data
    return data
  }
}

export default DivisionService
