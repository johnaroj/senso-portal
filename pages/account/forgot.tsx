import type { NextPage } from 'next'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loading from 'components/Loading';

type FormValues = {
    email: string;
    watermeter: string;
};

const Forgot: NextPage = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const { forgot, error, loading } = useContext(AuthContext)

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        forgot(data.email, data.watermeter);

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
                        Recover Senso Number
                    </h1>
                    <ToastContainer />
                    {loading && <Loading />}
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
                            <label className="mb-2" htmlFor="watermeter">Watermeter Number</label>
                            <input
                                className="w-full h-10 p-1 mt-2 bg-gray-100 focus:outline-none focus:ring focus:border-jelly-bean-500"
                                type="text"
                                {...register("watermeter", { required: true })}
                                required
                            />
                        </div>
                        <input type="submit" disabled={loading} value={`${loading ? 'Loading...' : 'Send'}`} className={`h-10 w-full my-2 ${loading ? 'bg-jelly-bean-200' : 'bg-jelly-bean-500'} hover:bg-jelly-bean-400 text-white active:shadow-md active:scale-110 active:text-gray-100`} />
                    </form>
                    <p>
                        Go Back to <Link href='/account/login'><a className="no-underline hover:underline hover:text-blue-700">Login</a></Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Forgot
