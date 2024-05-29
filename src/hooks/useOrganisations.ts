import {useQuery} from 'react-query'
import OrganisationService from '../services/organisationService'
import {Organisation} from '../types/organitation'

function useOrganisations() {
  return useQuery<any, unknown, Organisation[]>(
    'organisations',
    () => OrganisationService.getOrganisations(),
    {initialData: []}
  )
}

export default useOrganisations
