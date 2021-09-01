import React, { createContext, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { Registration, UserInput } from '../types/types'
import { NEXT_URL } from '@/config/index'

interface AuthContextState {
  user: Registration | null;
  error: Error | null;
  register: (registration: Registration) => void;
  login: (userInput: UserInput) => void;
  logout: () => void;
  checkRegistration: (watermeter: number) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextState)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const router = useRouter()
  // Register user
  const register = async (registration: Registration) => {
    console.log('authContext', registration)
    const res = await fetch(`${NEXT_URL}/api/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registration),
    })

    const data = await res.json()
    if (res.ok) {
      setUser(data)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Login user
  const login = async (user: UserInput) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data)
      router.push('/account/dashboard')
    } else {
      setError(data.message)
      setError(null)
    }
  }

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }
  const checkRegistration = async (watermeter: number) => {
    const response = await fetch(`${NEXT_URL}/api/registration?watermeter=${watermeter}`);
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const exists = await response.json();
    return !!exists.id;
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkRegistration }}>
      {children}
    </AuthContext.Provider>
  )
}

