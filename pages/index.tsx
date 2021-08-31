import type { NextPage } from 'next'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '@heroicons/react/solid/UserIcon'
import { Registration } from 'types/types';


const existingRegistration = async (watermeter: number) => {
  const response = await fetch(`api/registration?watermeter=${watermeter}`);
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
}


const saveRegistration = async (registration: Registration) => {
  const response = await fetch('api/registration', {
    method: 'POST',
    body: JSON.stringify(registration)
  });
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json();
}


interface Props {
  registration: Registration
}

const Home: NextPage<Props> = () => {
  const [email, setEmail] = useState('')
  const [watermeter, setWatermeter] = useState(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existing = await existingRegistration(watermeter)
    if (existing.length > 0) {
      toast.error('already registered')
    } else {
      saveRegistration({ email: email, watermeter: Number(watermeter), senso_number: 100000 + Math.floor(Math.random() * 900000) })
      setEmail('');
      setWatermeter(0);
    }

  }

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="max-width-[500px] m-auto p-8 shadow-lg">
        <div className="flex">
          <UserIcon className="h-8" />
          <h1 className='text-2xl font-bold'>
            Register
          </h1>
        </div>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label className="mb-6" htmlFor="email">Email Address</label>
            <input className="w-full h-10 p-1" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="my-2">
            <label className="mb-6" htmlFor="watermeter">Watermeter Number</label>
            <input className="w-full h-10 p-1" type="number" id="watermeter" value={watermeter || ''} onChange={e => setWatermeter(Number(e.target.value))} />
          </div>
          <input type="submit" value="Register" className='h-10 w-full my-2  bg-gray-800 text-white active:shadow-md active:bg-gray-400 active:text-black active:scale-25' />
        </form>
      </div>
    </div>

  )
}

export default Home
