import { gql } from '@apollo/client'
import { GravityFormsForm } from './gravityFormsTypes'

import { apolloClient } from './apollo'
import { EMAIL_FIELD_FIELDS } from '@/components/gravityFormFields/EmailField'
import { NAME_FIELD_FIELDS } from '@/components/gravityFormFields/NameField'
import { SELECT_FIELD_FIELDS } from '@/components/gravityFormFields/SelectField'
import { TEXT_AREA_FIELD_FIELDS } from '@/components/gravityFormFields/TextAreaField'
import { TEXT_FIELD_FIELDS } from '@/components/gravityFormFields/TextField'

const GET_FORM = gql`
  query getForm($databaseId: ID!) {
    gfForm(id: $databaseId, idType: DATABASE_ID) {
      id
      databaseId
      title
      description
      button {
        text
      }
      confirmations {
        isDefault
        message
      }
      formFields(first: 500) {
        nodes {
          id
          type
          visibility
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on NameField {
            ...NameFieldFields
          }
          ... on SelectField {
            ...SelectFieldFields
          }
          ... on TextField {
            ...TextFieldFields
          }
          ... on TextAreaField {
            ...TextAreaFieldFields
          }
        }
      }
    }
  }
  ${EMAIL_FIELD_FIELDS}
  ${NAME_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${TEXT_AREA_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
`

export default async function getGravityForm(
  databaseId: number
): Promise<GravityFormsForm | undefined> {
  const result = await apolloClient.query({
    query: GET_FORM,
    variables: { databaseId },
  })

  return result?.data?.gfForm
}
