/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'
import useDepartments from './useDepartments'
import useDivisions from './useDivisions'
import useOrganisations from './useOrganisations'

function useOnboardingForm() {
  const [currentOrg, setCurrentOrg] = useState({
    orgKey: '',
    depKey: ''
  })

  const changeOrgKey = (orgKey: string) => {
    setCurrentOrg({
      ...currentOrg,
      orgKey
    })
  }

  const changeDepKey = (depKey: string) => {
    setCurrentOrg({
      ...currentOrg,
      depKey
    })
  }

  const organisations = useOrganisations()
  const departments = useDepartments(currentOrg.orgKey)
  const divisions = useDivisions(currentOrg.depKey)

  useEffect(() => {
    if (currentOrg.orgKey) departments.refetch()
  }, [currentOrg.orgKey])

  useEffect(() => {
    if (currentOrg.depKey) divisions.refetch()
  }, [currentOrg.depKey])

  return {
    ...currentOrg,
    changeOrgKey,
    changeDepKey,
    organisations,
    departments,
    divisions
  }
}

export default useOnboardingForm
