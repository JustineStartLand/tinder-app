import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import useAuthStore from './stores/useAuthStore'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (checkingAuth) {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full flex items-center justify-center bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <p className="text-2xl text-black">Loading...</p>
      </div>
    )
  } else {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <Routes>
          <Route
            path="/"
            element={!authUser ? <Navigate to={'/auth'} /> : <HomePage />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to={'/'} />}
          />
          <Route
            path="/profile"
            element={!authUser ? <Navigate to={'/auth'} /> : <ProfilePage />}
          />
          <Route
            path="/chat/:id"
            element={!authUser ? <Navigate to={'/auth'} /> : <ChatPage />}
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    )
  }
}

export default App
