import { Footer } from "components/Footer"
import { Header } from "components/Header"
import { NextPage } from "next"
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import { SyntheticEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_CENSUS_URL } from '@/config/index'

const SuccessPage: NextPage = () => {
    const { user } = useContext(AuthContext)
    const router = useRouter();

    // useEffect(() => {
    //     !user && router.push('/')
    // }, [])

    const handleSubmit = (e: SyntheticEvent) => {
        document.location.href = NEXT_CENSUS_URL + user?.senso_number;
    }
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto">
                <div className="py-4">
                    <Image
                        src='/images/proefcensus-logo-final.jpeg'
                        layout="fixed"
                        height="150"
                        width="220"
                    />

                </div>
                <div className="flex justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl">
                            Danki pa partisipa na nos Senso di Prueba. Thank you for participating in the Pilot Census.
                            <br />
                            Bo number di Senso ta/ your census number is: {user?.senso_number}
                            <br />
                            Pa kuminsa ku bo enkuesta, por fabor primi riba e link aki/ To start your survey, please press this link:
                            <br />

                            Danki di parti di Ofisina Sentral Di Estadistika (CBS). Thank you in advance from the Central Bureau of Statistics (CBS).
                        </h1>
                        <button className="bg-orange-500 w-64 h-16 my-10 text-white text-2xl shadow-sm hover:shadow-xl hover:bg-orange-700 hover:text-gray-200 active:scale-90" onClick={handleSubmit}>Klik pa yena</button>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}

export default SuccessPage;