import React, { useState } from 'react'

const AuthForm = ({
  title,
  onSubmit,
  loading,
  error,
  isLogin = false,
  switchLabel,
  onSwitch,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!email || !password) {
      setFormError('All fields are required.')
      return
    }

    if (!email.includes('@')) {
      setFormError('Invalid email.')
      return
    }

    onSubmit({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {title}
        </h2>

        {(formError || error) && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Please wait...' : title}
          </button>
        </form>

        <div className="text-sm mt-4 text-center">
          {switchLabel}{' '}
          <button
            onClick={onSwitch}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
