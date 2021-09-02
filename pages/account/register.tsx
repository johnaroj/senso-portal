import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link'


type FormValues = {
  email: string;
  watermeter: number;
  senso_number: number;
};
const Register: NextPage = () => {
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
    <div className="container mx-auto">
      <div className="py-4">
        <Image
          src='/images/proefcensus-logo-final.jpeg'
          layout="fixed"
          height="150"
          width="220"
        />

      </div>
      <div className="flex items-center">
        <div className="w-full sm:w-4/5 md:w-3/4 xl:w-2/4  m-auto p-8 rounded-2xl shadow-lg border-t-8 border-blue-100">
          <h1 className='text-2xl font-bold my-4'>
            Register Account
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2" htmlFor="email">E-mail Address</label>
              <input
                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:border-blue-100"
                type="email"
                {...register("email", { required: true })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="watermeter">Watermeter Number</label>
              <input
                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:border-blue-100"
                type="number"
                {...register("watermeter", { required: true })}
                required
              />
            </div>
            <input type="submit" value="Register" className='h-10 w-full my-2  bg-blue-500 text-white active:shadow-md active:bg-gray-400 active:text-black active:scale-25' />
          </form>
          <p>
            Already have an account? <Link href='/account/login'>Login</Link>
          </p>
        </div>
      </div>
    </div>


  )
}

export default Register
