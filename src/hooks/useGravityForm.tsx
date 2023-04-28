import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react'

import { EmailInput, NameInput } from '@/services/gravityFormsTypes'

export interface FieldValue {
  id: number
}

export interface EmailFieldValue extends FieldValue {
  emailValues: EmailInput
}

export interface NameFieldValue extends FieldValue {
  nameValues: NameInput
}

export interface StringFieldValue extends FieldValue {
  value: string
}

export interface StringFieldValues extends FieldValue {
  values: string[]
}

export type FieldValueUnion =
  | EmailFieldValue
  | NameFieldValue
  | StringFieldValue
  | StringFieldValues

interface Action {
  type: ACTION_TYPES
  fieldValue: FieldValueUnion
}

export enum ACTION_TYPES {
  updateEmailFieldValue = 'updateEmailFieldValue',
  updateNameFieldValue = 'updateNameFieldValue',
  updateSelectFieldValue = 'updateSelectFieldValue',
  updateTextAreaFieldValue = 'updateTextAreaFieldValue',
  updateTextFieldValue = 'updateTextFieldValue',
}

function reducer(state: FieldValueUnion[], action: Action) {
  const getOtherFieldValues = (id: number) =>
    state.filter((fieldValue) => fieldValue.id !== id)

  switch (action.type) {
    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue as EmailFieldValue
      return [...getOtherFieldValues(id), { id, emailValues }]
    }

    case ACTION_TYPES.updateNameFieldValue: {
      const { id, nameValues } = action.fieldValue as NameFieldValue
      return [...getOtherFieldValues(id), { id, nameValues }]
    }

    case ACTION_TYPES.updateEmailFieldValue: {
      const { id, emailValues } = action.fieldValue as EmailFieldValue
      return [...getOtherFieldValues(id), { id, emailValues }]
    }

    case ACTION_TYPES.updateSelectFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue
      return [...getOtherFieldValues(id), { id, value }]
    }

    case ACTION_TYPES.updateTextAreaFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue
      return [...getOtherFieldValues(id), { id, value }]
    }

    case ACTION_TYPES.updateTextFieldValue: {
      const { id, value } = action.fieldValue as StringFieldValue
      return [...getOtherFieldValues(id), { id, value }]
    }

    default:
      throw new Error(
        `Field value update operation not supported: ${action.type}.`
      )
  }
}

const DEFAULT_STATE: FieldValueUnion[] = []

const GravityFormContext = createContext<{
  state: FieldValueUnion[]
  dispatch: Dispatch<Action>
}>({
  state: DEFAULT_STATE,
  dispatch: () => null,
})

export function GravityFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)

  return (
    <GravityFormContext.Provider value={{ state, dispatch }}>
      {children}
    </GravityFormContext.Provider>
  )
}

const useGravityForm = () => useContext(GravityFormContext)

export default useGravityForm
