import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto flex items-center justify-center h-96">

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
