import { NextPage } from "next"

const Loading: NextPage = () => {
    return (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center text-gray-800">
            <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
                <div className="bg-blue-600 p-2 w-4 h-4 rounded-full animate-bounce animation-delay-100"></div>
                <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce animation-delay-300"></div>
                <div className="bg-red-600 p-2 w-4 h-4 rounded-full animate-bounce animation-delay-600"></div>
            </div>
        </div>
    )
}

export default Loading;