import {useQuery} from 'react-query'
import DepartmentService from '../services/departmentService'
import {Department} from '../types/department'

function useDepartments(orgKey?: string) {
  return useQuery<any, unknown, Department[]>(
    `departments-${orgKey}`,
    () => DepartmentService.getDepartments(orgKey),
    {
      initialData: [],
      enabled: false
    }
  )
}

export default useDepartments
