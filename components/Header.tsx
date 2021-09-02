import Link from "next/link"

export const Header = () => {
    return (
        <div className="sticky top-0 bg-jelly-bean-500">
            <div className="container mx-auto">
                <ul className="flex justify-end">
                    <li className="mr-6 py-4">
                        <Link href="/">
                            <a className="text-white text-2xl hover:text-gray-200" >Home</a>
                        </Link>

                    </li>
                    <li className="mr-6 py-4">
                        <Link href="/">
                            <a className="text-white text-2xl hover:text-gray-200" href="/contacts">Kontakto</a>
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
