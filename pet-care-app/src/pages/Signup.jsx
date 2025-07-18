import React from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { showError,showSuccess } from '../utils/toastUtils'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSignup = ({ email, password }) => {
    dispatch(signupUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        showSuccess('Account successfully created!')
        navigate('/login')
      }
      if (res.meta.requestStatus === 'rejected') {
        showError('Signup failed. Please try again.')
      }
    })
  }

  return (
    <AuthForm
      title="Create Account"
      loading={loading}
      error={error}
      onSubmit={handleSignup}
      isLogin={false}
      switchLabel="Already have an account?"
      onSwitch={() => navigate('/login')}
    />
  )
}

export default Signup
