import React, { createContext, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { Registration, UserInput } from '../types/types'
import { NEXT_URL } from '@/config/index'

interface CheckIfExistsResponse {
  exists: boolean;
  message: string;
}

interface AuthContextState {
  loading: boolean
  user: Registration | null;
  error: Error | null;
  register: (registration: Registration) => void;
  login: (userInput: UserInput) => void;
  logout: () => void;
  forgot: (email: string, watermeter: string) => void;
  checkWatermeter: (watermeter: string) => Promise<CheckIfExistsResponse>;
  checkRegistration: (watermeter: string, email: string) => Promise<CheckIfExistsResponse>;
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


  const forgot = async (email: string, watermeter: string) => {
    setLoading(true);
    const res = await fetch(`${NEXT_URL}/api/recover?email=${email}&watermeter=${watermeter}`)
    const data = await res.json()

    if (res.ok) {
      setUser(data)
      setLoading(false);
      //router.push('/success')
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
  const checkWatermeter = async (watermeter: string) => {
    setLoading(true)
    const response = await fetch(`${NEXT_URL}/api/registration?watermeter=${watermeter}`);
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const exists = await response.json();
    setLoading(false)
    return { exists: !!exists.message, message: exists.message };
  }

  const checkRegistration = async (watermeter: string, email: string) => {
    setLoading(true)
    const response = await fetch(`${NEXT_URL}/api/registration?watermeter=${watermeter}&email=${email}`);
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const exists = await response.json();
    setLoading(false)
    return { exists: !!exists.message, message: exists.message };
  }

  return (
    <AuthContext.Provider value={{ loading, user, error, forgot, register, login, logout, checkWatermeter, checkRegistration }}>
      {children}
    </AuthContext.Provider>
  )
}

