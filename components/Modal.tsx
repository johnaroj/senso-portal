import { XIcon } from '@heroicons/react/solid/'

type Props = {
    showModal: boolean;
    onCloseModal: () => void;
    onConfirm: (conformed: boolean) => void;
}

const Modal = ({ showModal, onConfirm, onCloseModal }: Props) => {

    return (
        <>
            {
                showModal &&
                <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center text-gray-800">
                    <div>
                        <div className=" bg-jelly-bean-500 rounded-t-2xl p-4 text-white">
                            <div className="flex justify-between items-center">
                                <h1 className="text-xl">This Watermeter number is al ready registered!</h1>
                                <XIcon className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-500 rounded-full" onClick={onCloseModal} />
                            </div>
                        </div>
                        <div className="bg-gray-200 p-2 rounded-b-2xl">
                            <p className="text-center m-4">E number di meter di awa ta wòrdu usa dor di mas ku un bibienda?</p>
                            <p className="text-center m-4">Is this watermeter number shared by more than one household?</p>
                            <div className="flex justify-around items-center m-4 text-sm">
                                <button className="bg-orange-500 hover:bg-orange-200 hover:text-black rounded shadow-md px-6 py-1 text-white hover:shadow-2xl" onClick={() => onConfirm(true)}> yes</button>
                                <button className="bg-orange-200 hover:bg-orange-500 hover:text-white rounded shadow-md px-6 py-1 hover:shadow-2xl" onClick={() => onConfirm(false)}>No</button>
                            </div>

                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Modal
