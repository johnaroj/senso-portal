import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '@heroicons/react/solid/UserIcon'
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link'


type FormValues = {
  email: string;
  watermeter: number;
  senso_number: number;
};
const Register = () => {
  const { checkRegistration, register: registerForm, error } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    error && toast.error(error)
  }, [error])


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const existing = await checkRegistration(data.watermeter)
    if (existing) {
      toast.error('already registered')
    } else {
      registerForm({ email: data.email, watermeter: Number(data.watermeter), senso_number: 100000 + Math.floor(Math.random() * 900000) });
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <label className="mb-6" htmlFor="email">Email Address</label>
            <input
              className="w-full h-10 p-1"
              type="email"
              {...register("email", { required: true })}
              required
            />
          </div>
          <div className="my-2">
            <label className="mb-6" htmlFor="watermeter">Watermeter Number</label>
            <input
              className="w-full h-10 p-1"
              type="number"
              {...register("watermeter", { required: true })}
              required
            />
          </div>
          <input type="submit" value="Register" className='h-10 w-full my-2  bg-gray-800 text-white active:shadow-md active:bg-gray-400 active:text-black active:scale-25' />
        </form>
        <p>
          Already have an account? <Link href='/account/login'>Login</Link>
        </p>
      </div>
    </div>

  )
}

export default Register
