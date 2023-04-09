import Head from 'next/head'
import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { useForm, Controller } from 'react-hook-form'
import { getGFormData, submitGFormData } from '@/services/api'
import { GET_SIGN_UP_FORM, SUBMIT_SIGN_UP_FORM } from '@/queries/forms'
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'

export default function Register({ formData }) {
  console.log(formData)
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      referral_source: 'AltaVista search',
    },
  })

  useEffect(() => {
    const subscription = watch(({ password, password_confirm }) => {
      if (password !== password_confirm) {
        setError('password_confirm', {
          type: 'mismatch',
          message: 'Passwords must match',
        })
      } else {
        clearErrors('password_confirm')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setError, clearErrors])

  const [submitForm, { data, loading, error }] =
    useMutation(SUBMIT_SIGN_UP_FORM)

  const onSubmit = (data) => {
    if (loading) return
    submitForm({
      variables: {
        formId: 2,
        fieldValues: { id: 1, nameValues: { first: 'test2', last: 'test2' } },
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <>
      <Head>
        <title>Sign Up - Pocket</title>
      </Head>
      <AuthLayout
        title="Sign up for an account"
        subtitle={
          <>
            Already registered?{' '}
            <Link href="/login" className="text-cyan-600">
              Sign in
            </Link>{' '}
            to your account.
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-6">
            <Controller
              name="first_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'First name is required',
                },
                maxLength: {
                  value: 30,
                  message: 'Must be no more than least 30 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="First name"
                  required
                  error={errors.first_name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="last_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Last name is required',
                },
                maxLength: {
                  value: 30,
                  message: 'Must be no more than 30 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Last name"
                  required
                  error={errors.last_name?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              autoComplete="email"
              rules={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                maxLength: {
                  value: 30,
                  message: 'Must be no more than 30 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Email address must be formatted correctly.',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Email address"
                  required
                  className="col-span-full"
                  error={errors.email?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 8,
                  message: 'Must be at least 8 characters',
                },
                maxLength: {
                  value: 30,
                  message: 'Must be no more than 30 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (such as @, $, !, %, *, ?, or &).',
                  multiline: true,
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  required
                  type="password"
                  className="col-span-full"
                  error={errors.password?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="password_confirm"
              control={control}
              rules={{
                validate: (value, formValues) => value === formValues.password,
              }}
              render={({ field }) => (
                <TextField
                  type="password"
                  required
                  label="Confirm Password"
                  className="col-span-full"
                  error={errors.password_confirm?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="referral_source"
              control={control}
              autoComplete="new-password"
              render={({ field }) => (
                <SelectField
                  className="col-span-full"
                  label="How did you hear about us?"
                  {...field}
                >
                  <option>AltaVista search</option>
                  <option>Super Bowl commercial</option>
                  <option>Our route 34 city bus ad</option>
                  <option>The “Never Use This” podcast</option>
                </SelectField>
              )}
            />
          </div>
          <Button type="submit" color="cyan" className="mt-8 w-full">
            Get started today
          </Button>
        </form>
      </AuthLayout>
    </>
  )
}

export const getStaticProps = async () => {
  const formData = await getGFormData(2, GET_SIGN_UP_FORM)

  return {
    props: { formData },
    revalidate: 10,
  }
}
