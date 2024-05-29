import axios from 'axios'
import {BASE_URL} from '../utils/common'

class DepartmentService {
  static async getDepartments(orgKey?: string) {
    const response = await axios.get(
      `${BASE_URL}/ce9708e8-9595-49e0-a577-cafec3ac3a28?orgKey=${orgKey}`
    )
    const data = await response.data
    return data
  }
}

export default DepartmentService
