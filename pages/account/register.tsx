import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link'
import Modal from 'components/Modal';
import Loading from 'components/Loading';

type FormValues = {
  email: string;
  watermeter: string;
  senso_number: number;
};

const Register: NextPage = () => {
  const { loading, checkWatermeter, register: registerForm, error, checkRegistration } = useContext(AuthContext)
  const { register, getValues, handleSubmit } = useForm<FormValues>();
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  useEffect(() => {
    confirm && registerForm({ email: getValues('email'), watermeter: getValues('watermeter'), senso_number: 100000 + Math.floor(Math.random() * 900000) });
  }, [showModal, confirm])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const existingRegistration = await checkRegistration(data.watermeter, data.email);

    if (existingRegistration.exists) {
      toast.error(existingRegistration.message)
      return;
    }

    const existing = await checkWatermeter(data.watermeter)

    if (existing.exists) {
      setShowModal(true)

    } else {
      registerForm({ email: data.email, watermeter: data.watermeter, senso_number: 100000 + Math.floor(Math.random() * 900000) });
    }
  }

  const onConfirm = (data: boolean) => {
    setConfirm(data)
    setShowModal(false)
  }

  const onCloseModal = () => {
    setShowModal(false)
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
          {loading && <Loading />}
          <Modal showModal={showModal} onConfirm={onConfirm} onCloseModal={onCloseModal} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2" htmlFor="email">E-mail Address</label>
              <input
                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:outline-none focus:ring focus:border-jelly-bean-600"
                type="email"
                {...register("email", { required: true })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2" htmlFor="watermeter">Watermeter Number</label>
              <input
                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:outline-none focus:ring focus:border-jelly-bean-500"
                type="text"
                {...register("watermeter", { required: true })}
                required
              />
            </div>
            <input type="submit" disabled={loading} value={`${loading ? 'Loading...' : 'Register'}`} className={`h-10 w-full my-2 ${loading ? 'bg-jelly-bean-300' : 'bg-jelly-bean-500'} hover:bg-jelly-bean-400 text-white active:shadow-md active:scale-110 active:bg-jelly-bean-600`} />
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
