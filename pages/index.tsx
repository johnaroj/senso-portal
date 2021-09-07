import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import type { NextPage } from 'next'
import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext';

const Home: NextPage = () => {
  const { user } = useContext(AuthContext)
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex flex-col items-center justify-center h-96">
        {user?.senso_number &&
          <div className="border-2 bg-gray-100 p-8 mb-4 text-center">
            <h1 className="text-2xl">Pa kompleta bo registrashon, wak bo email pa bo number di Senso</h1>
            <p className="">To complete your registration, check your email for your census number</p>
          </div>
        }

        <div className="flex space-x-3 md:space-x-24 xl:space-x-40">
          <button onClick={() => router.push('/account/login')} className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
            Login
          </button>

          <button onClick={() => router.push('/account/register')} className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
            Register
          </button>
        </div>

      </main>
      <Footer />
    </div>


  )
}

export default Home
