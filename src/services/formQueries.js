import { gql } from '@apollo/client'

export const NAME_FIELD_FIELDS = gql`
  fragment NameFieldFields on NameField {
    databaseId
    label
    isRequired
    type
    hasAutocomplete
    cssClass
    adminLabel
    inputs {
      ... on NameInputProperty {
        autocompleteAttribute
        key
        isHidden
      }
      label
    }
  }
`

export const PASSWORD_FIELD_FIELDS = gql`
  fragment PasswordFieldFields on PasswordField {
    databaseId
    label
    isRequired
    type
    cssClass
    inputs {
      label
      ... on PasswordInputProperty {
        id
        isHidden
        placeholder
        label
      }
    }
  }
`

export const EMAIL_FIELD_FIELDS = gql`
  fragment EmailFieldFields on EmailField {
    databaseId
    label
    isRequired
    type
    hasAutocomplete
    cssClass
    adminLabel
    inputs {
      ... on EmailInputProperty {
        name
        label
        id
        autocompleteAttribute
        placeholder
      }
    }
    hasEmailConfirmation
  }
`

export const SELECT_FIELD_FIELDS = gql`
  fragment SelectFieldFields on SelectField {
    databaseId
    label
    isRequired
    type
    choices {
      text
    }
    cssClass
  }
`

export const GET_SIGN_UP_FORM = gql`
  query getForm($formID: ID!) {
    gfForms(where: { formIds: [$formID] }) {
      edges {
        node {
          id
          title
          formFields(first: 500) {
            edges {
              node {
                ... on NameField {
                  ...NameFieldFields
                }
                ... on EmailField {
                  ...EmailFieldFields
                }
                ... on PasswordField {
                  ...PasswordFieldFields
                }
                ... on SelectField {
                  ...SelectFieldFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${NAME_FIELD_FIELDS}
  ${EMAIL_FIELD_FIELDS}
  ${PASSWORD_FIELD_FIELDS}
  ${SELECT_FIELD_FIELDS}
`
