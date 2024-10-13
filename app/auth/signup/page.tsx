import AuthForm from '@/components/custom_components/AuthForm'
import React from 'react'

const SignUp = () => {
  return (
    <div className='flex-1 grid place-items-center h-full'>
      <AuthForm mode="signup" />
    </div>
  )
}

export default SignUp