import Head from 'next/head'
import Link from 'next/link'

import { getPageTemplateData } from '@/services/api'

import { AuthLayout } from '@/components/AuthLayout'
import getGravityForm from '@/services/gravityForms'
import GravityForm from '@/components/gravityForm/GravityForm'

export default function Register({ pageData, form }) {
  return (
    <>
      <Head>
        <title>Sign Up - Pocket</title>
      </Head>
      <AuthLayout title={pageData?.template?.contact?.heading} subtitle={''}>
        <GravityForm form={form} />
      </AuthLayout>
    </>
  )
}

export async function getStaticProps() {
  const templateData = await getPageTemplateData('/contact/')
  const gFormId = templateData?.template?.contact?.gravityFormId
  const form = await getGravityForm(gFormId)
  const pageData = { ...templateData }

  return {
    props: { pageData, form },
  }
}
