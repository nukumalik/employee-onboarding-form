import {useQuery} from 'react-query'
import DivisionService from '../services/divisionService'
import {Division} from '../types/division'

function useDivisions(depKey?: string) {
  return useQuery<any, unknown, Division[]>(
    `divisions-${depKey}`,
    () => DivisionService.getDivisions(depKey),
    {
      initialData: [],
      enabled: false
    }
  )
}

export default useDivisions
