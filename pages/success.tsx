import { Footer } from "components/Footer"
import { Header } from "components/Header"
import { NextPage } from "next"
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import { SyntheticEvent, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const SuccessPage: NextPage = () => {
    const { user } = useContext(AuthContext)
    const router = useRouter();

    useEffect(() => {
        !user && router.push('/')
    }, [])

    const handleSubmit = (e: SyntheticEvent) => {
        document.location.href = 'https://www.dooblocawi.com/client/Survey.aspx?Ticket=' + user?.senso_number;
    }
    return (
        <div>
            <Header />
            <div className="container mx-auto">
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
                        <h1 className="text-2xl">Danki pa partisipa na Senso 22</h1>
                        <h1 className="text-2xl">Porfabor klik e boton pa yena e enkuesta</h1>
                        <button className="bg-orange-500 w-64 h-16 text-white text-xl" onClick={handleSubmit}>Klik pa yena</button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SuccessPage;