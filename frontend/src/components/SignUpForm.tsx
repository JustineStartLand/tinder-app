import { useState } from 'react'
import type { TSignUpCredentials } from '../types/Auth.types'
import useAuthStore from '../stores/useAuthStore'

const SignUpForm = () => {
  const initialCreds: TSignUpCredentials = {
    name: '',
    email: '',
    password: '',
    age: 0,
    gender: 'male',
    genderPreference: '',
  }
  const { isSigningUp: loading, signUp } = useAuthStore()

  const [signUpCredentials, setSignUpCredentials] =
    useState<TSignUpCredentials>(initialCreds)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(signUpCredentials)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSignUpCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="name"
            autoComplete="name"
            required
            value={signUpCredentials.name}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={signUpCredentials.email}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            value={signUpCredentials.password}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            id="age"
            name="age"
            type="number"
            required
            value={signUpCredentials.age}
            onChange={handleChange}
            min="18"
            max="120"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Gender
        </label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="male"
              name="gender"
              value="male"
              type="checkbox"
              checked={signUpCredentials.gender === 'male'}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              name="gender"
              value="female"
              type="checkbox"
              checked={signUpCredentials.gender === 'female'}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Prefer Me
        </label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="male"
              name="genderPreference"
              value="male"
              type="radio"
              checked={signUpCredentials.genderPreference === 'male'}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              name="genderPreference"
              value="female"
              type="radio"
              checked={signUpCredentials.genderPreference === 'female'}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label
              htmlFor="female"
              className="ml-2 block text-sm text-gray-900"
            >
              Female
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="prefer-both"
              name="genderPreference"
              value="both"
              type="radio"
              checked={signUpCredentials.genderPreference === 'both'}
              onChange={handleChange}
              className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-gray-300 rounded"
            />
            <label
              htmlFor="prefer-both"
              className="ml-2 block text-sm text-gray-900"
            >
              Both
            </label>
          </div>
        </div>
      </div>

      <div>
        <button
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
    </form>
  )
}

export default SignUpForm
