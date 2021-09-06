import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return (
        <footer className="bg-jelly-bean-500  mt-auto">
            <div className="container grid grid-cols-3 mt-4 mx-auto text-white">
                <div className="p-4">
                    <h1 className="text-3xl mb-2">Ofisina Sentral di Statistik Kòrsou</h1>
                    <p className="text-md mb-2">WTC Building, Piscadera Bay z/n (first floor)
                        <br />
                        Willemstad, Curaçao
                    </p>

                    <p className="text-md mb-2">Telephone: (+599-9) 724-9160
                        <br />
                        WhatsApp: (+599-9) 520-2227
                        <br />
                        Email: senso@cbs.cw
                    </p>
                    <p className="text-md mb-2">E-learning area</p>

                </div>
                <div className='p-4'>
                    <p className="mb-2">Mas informashon di CBS:</p>
                    <p className="mb-2"><a className="underline hover:no-underline" href="https://www.cbs.cw/">www.cbs.cw</a></p>
                    <p className="mb-2"><a className="underline hover:no-underline" href="http://digitallibrary.cbs.cw/">https://digitallibrary.cbs.cw</a></p>
                    <p className="mb-2"><a className="underline hover:no-underline" href="https://curacaodata.cbs.cw/">https://curacaodata.cbs.cw</a></p>
                </div>
                <div className='p-4'>
                    <h2 className="mb-2">Sigui nos na:</h2>
                    <div className="flex mb-4">
                        <Link href="https://www.facebook.com/cbscur/"><a className="flex items-center mr-2 my-2"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></Link>
                        <Link href="https://www.youtube.com/channel/UC97yy978ZXTZN4lzWqRzqLg"><a className="flex items-center m-2"><FontAwesomeIcon icon={faYoutube} size="2x" /></a></Link>
                        <Link href="https://www.instagram.com/cbscuracao/"><a className="flex items-center m-2"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></Link>
                    </div>

                    <h2 className="mb-2">Tokante di e&nbsp;<a className='underline hover:no-underline' href="/sitemap">wèpsait</a></h2><ul>
                        <li><a className="underline hover:no-underline" href="/sitemap">Sitemap</a></li>
                        <li>Disclaimer</li></ul>
                </div>
            </div>
        </footer>
    )
}
