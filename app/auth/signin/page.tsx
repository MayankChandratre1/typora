import AuthForm from '@/components/custom_components/AuthForm'
import React from 'react'

const SignIn = () => {
  return (
    <div className='flex-1 grid place-items-center h-full'>
      <AuthForm mode="signin" />
    </div>
  )
}

export default SignIn