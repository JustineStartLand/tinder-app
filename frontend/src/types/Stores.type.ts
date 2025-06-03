import type { TLoginCredentials, TSignUpCredentials } from './Auth.types'

export type TGender = 'male' | 'female'
export type TGenderPreference = 'male' | 'female' | 'both'

export type TUser = {
  id: string
  name: string
  email: string
  age: number
  gender: TGender
  genderPreference: TGenderPreference
  image: string
  bio: string
  dislikes: string[]
  likes: string[]
  matches: string[]
  createdAt: Date
  updatedAt: Date
}

export type TSwipeFeedback = 'liked' | 'passed' | 'matched' | null

export type TUserWithMatches = {
  id: string
  name: string
  email: string
  age: number
  gender: TGender
  genderPreference: TGenderPreference
  image: string
  bio: string
  dislikes: string[]
  likes: string[]
  matches: TUserWithMatches[]
  createdAt: Date
  updatedAt: Date
}

export type TAuthStore = {
  authUser: TUser | null
  checkingAuth: boolean
  isLoggingIn: boolean
  isSigningUp: boolean
  isLoggingOut: boolean
  login: (loginData: TLoginCredentials) => Promise<void>
  signUp: (signUpCredentials: TSignUpCredentials) => Promise<void>
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}
