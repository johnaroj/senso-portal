import type { NextPage } from 'next'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';

type FormValues = {
    email: string;
    senso_number: number;
};

const Login: NextPage = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const { login, error } = useContext(AuthContext)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        login({ email: data.email, senso_number: Number(data.senso_number) });
    }

    useEffect(() => {
        error && toast.error(error)
    }, [error])

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
                <div className="w-full sm:w-4/5 md:w-3/4 xl:w-2/4 m-auto p-8 rounded-2xl shadow-lg border-t-8 border-blue-100">
                    <h1 className='text-2xl font-bold my-4'>
                        Login
                    </h1>
                    <ToastContainer />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="mb-2" htmlFor="email">E-mail Address</label>
                            <input
                                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:outline-none focus:ring focus:border-jelly-bean-500"
                                type="email"
                                {...register("email", { required: true })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2" htmlFor="email">Senso Number</label>
                            <input
                                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:outline-none focus:ring focus:border-jelly-bean-500"
                                type="number"
                                {...register("senso_number", { required: true })}
                                required
                            />
                        </div>
                        <input type="submit" value="Login" className='h-10 w-full my-2 bg-jelly-bean-500 hover:bg-jelly-bean-400 text-white active:shadow-md active:scale-110 active:text-gray-100' />
                    </form>
                    <p>
                        Dont have an account? <Link href='/account/register'>Register</Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Login
