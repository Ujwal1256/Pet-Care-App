// src/pages/Login.jsx
import React, { useContext } from 'react'
import AuthForm from '../components/AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { showError,showSuccess } from '../utils/toastUtils'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleLogin = ({ email, password }) => {
    dispatch(loginUser({ email, password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        showSuccess('Login successful!')
        navigate('/dashboard', { replace: true });
      }
      if (res.meta.requestStatus === 'rejected') {
        showError('Login failed. Please try again.')
      }
    })
  }

  return (
    <AuthForm
      title="Login"
      loading={loading}
      error={error}
      onSubmit={handleLogin}
      isLogin={true}
      switchLabel="Don't have an account?"
      onSwitch={() => navigate('/signup')}
    />
  )
}

export default Login
