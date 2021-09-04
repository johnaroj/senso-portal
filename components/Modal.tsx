import { XIcon } from '@heroicons/react/solid/'
import { useState, useEffect } from 'react';

type Props = {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    onConfirm: (conformed: boolean) => void;
}

const Modal = ({ showModal = false, onConfirm, setShowModal }: Props) => {

    return (
        <>
            {
                showModal &&
                <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center text-gray-800">
                    <div className="bg-gray-200 p-2 rounded shadow-xl">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl">This Watermeter number is al ready registered!</h1>
                            <XIcon className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-500 rounded-full" onClick={() => setShowModal(false)} />
                        </div>
                        <p className="text-center m-4">Do you want to share this Watermeter Number?</p>
                        <div className="flex justify-around items-center m-4 text-sm">
                            <button className="bg-orange-500 hover:bg-orange-200 hover:text-black rounded shadow-md px-6 py-1 text-white hover:shadow-2xl" onClick={() => onConfirm(true)}> yes</button>
                            <button className="bg-orange-200 hover:bg-orange-500 hover:text-white rounded shadow-md px-6 py-1 hover:shadow-2xl" onClick={() => onConfirm(false)}>No</button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Modal
