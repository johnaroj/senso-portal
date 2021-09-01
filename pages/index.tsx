import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-around bg-gray-100 h-screen">

      <button onClick={() => router.push('/account/login')} className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
        Login
      </button>

      <button onClick={() => router.push('/account/register')} className="text-purple-500 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
        Register
      </button>
    </div>

  )
}

export default Home
