import type { NextPage } from 'next'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserIcon from '@heroicons/react/solid/UserIcon'
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
        <div className="flex items-center justify-center bg-gray-100 h-screen">
            <div className="max-width-[500px] m-auto p-8 shadow-lg">
                <div className="flex">
                    <UserIcon className="h-8" />
                    <h1 className='text-2xl font-bold'>
                        Login
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
                        <label className="mb-6" htmlFor="watermeter">Senso Number</label>
                        <input
                            className="w-full h-10 p-1"
                            type="number"
                            {...register("senso_number", { required: true })}
                            required
                        />
                    </div>
                    <input type="submit" value="Login" className='h-10 w-full my-2  bg-gray-800 text-white active:shadow-md active:bg-gray-400 active:text-black active:scale-25' />
                </form>
                <p>
                    Don't have an account? <Link href='/account/register'>Register</Link>
                </p>
            </div>
        </div>

    )
}

export default Login
