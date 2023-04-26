import { gql } from '@apollo/client'
import { GravityFormsForm } from './gravityFormsTypes'

import { apolloClient } from './apollo'
import { ADDRESS_FIELD_FIELDS } from '@/components/gravityFormFields/AddressField'
import { CHECKBOX_FIELD_FIELDS } from '@/components/gravityFormFields/CheckboxField'
import { DATE_FIELD_FIELDS } from '@/components/gravityFormFields/DateField'
import { EMAIL_FIELD_FIELDS } from '@/components/gravityFormFields/EmailField'
import { NAME_FIELD_FIELDS } from '@/components/gravityFormFields/NameField'
import { PHONE_FIELD_FIELDS } from '@/components/gravityFormFields/PhoneField'
import { RADIO_FIELD_FIELDS } from '@/components/gravityFormFields/RadioField'
import { SELECT_FIELD_FIELDS } from '@/components/gravityFormFields/SelectField'
import { TEXT_AREA_FIELD_FIELDS } from '@/components/gravityFormFields/TextAreaField'
import { TEXT_FIELD_FIELDS } from '@/components/gravityFormFields/TextField'
import { TIME_FIELD_FIELDS } from '@/components/gravityFormFields/TimeField'
import { WEBSITE_FIELD_FIELDS } from '@/components/gravityFormFields/WebsiteField'

const GET_FORM = gql`
  query getForm($formId: ID!) {
    gravityFormsForm(id: $formId, idType: DATABASE_ID) {
      formId
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
          ... on AddressField {
            ...AddressFieldFields
          }
          ... on CheckboxField {
            ...CheckboxFieldFields
          }
          ... on DateField {
            ...DateFieldFields
          }
          ... on EmailField {
            ...EmailFieldFields
          }
          ... on NameField {
            ...NameFieldFields
          }
          ... on PhoneField {
            ...PhoneFieldFields
          }
          ... on RadioField {
            ...RadioFieldFields
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
          ... on TimeField {
            ...TimeFieldFields
          }
          ... on WebsiteField {
            ...WebsiteFieldFields
          }
        }
      }
    }
  }
  ${ADDRESS_FIELD_FIELDS}
  ${CHECKBOX_FIELD_FIELDS}
  ${DATE_FIELD_FIELDS}
  ${EMAIL_FIELD_FIELDS}
  ${NAME_FIELD_FIELDS}
  ${PHONE_FIELD_FIELDS}
  ${RADIO_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
  ${TEXT_AREA_FIELD_FIELDS}
  ${TEXT_FIELD_FIELDS}
  ${TIME_FIELD_FIELDS}
  ${WEBSITE_FIELD_FIELDS}
`

export default async function getGravityForm(
  formId: number
): Promise<GravityFormsForm | undefined> {
  const result = await apolloClient.query({
    query: GET_FORM,
    variables: { formId },
  })

  return result?.data?.gravityFormsForm
}
