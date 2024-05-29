import React, {useReducer} from 'react'
import OnboardingForm from './components/OnboardingForm'
import {Employee} from './types/employee'

const EmployeeContext = React.createContext<Employee[]>([])

const reducer = (state: Employee[], action: {payload: Employee; type: string}) => {
  switch (action.type) {
    case 'addEmployee': {
      return [action.payload, ...state]
    }
    default: {
      return state
    }
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, [])

  const handleAddEmployee = (value: any) => {
    dispatch({type: 'addEmployee', payload: value})
  }

  return (
    <EmployeeContext.Provider value={state}>
      <div className="max-w-[550px] mx-auto py-5">
        <OnboardingForm onFinish={handleAddEmployee} />
      </div>
    </EmployeeContext.Provider>
  )
}

export default App
