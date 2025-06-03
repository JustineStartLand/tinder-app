import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className="text-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-600 mb-8">
          {isLogin ? 'Sign in to Startland' : 'Create a Startland account'}
        </h2>
        <div className="bg-white shadow-xl rounded-lg p-8 border">
          {isLogin ? <LoginForm /> : <SignUpForm />}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'New to Swipe?' : 'Already have an account?'}
            </p>
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="mt-2 text-slate-600 hover:text-slate-800 font-medium transition-colors duration-300"
            >
              {isLogin ? 'Create a new account' : 'Sign in to your account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
