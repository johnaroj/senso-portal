import React, { createContext, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { Registration, UserInput } from '../types/types'
import { NEXT_URL } from '@/config/index'

interface AuthContextState {
  loading: boolean
  user: Registration | null;
  error: Error | null;
  register: (registration: Registration) => void;
  login: (userInput: UserInput) => void;
  logout: () => void;
  checkRegistration: (watermeter: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextState)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false);

  const router = useRouter()
  // Register user
  const register = async (registration: Registration) => {
    setLoading(true);
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
      setLoading(false);
      router.push('/')
    } else {
      setLoading(false);
      setError(data.message)
      setError(null)
    }
  }

  // Login user
  const login = async (user: UserInput) => {
    setLoading(true);
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
      setLoading(false);
      router.push('/success')
    } else {
      setLoading(false);
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
  const checkRegistration = async (watermeter: string) => {
    const response = await fetch(`${NEXT_URL}/api/registration?watermeter=${watermeter}`);
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const exists = await response.json();
    return !!exists.id;
  }

  return (
    <AuthContext.Provider value={{ loading, user, error, register, login, logout, checkRegistration }}>
      {children}
    </AuthContext.Provider>
  )
}

