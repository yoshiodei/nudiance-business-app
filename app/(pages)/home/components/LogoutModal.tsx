import React, { useState } from 'react'
import Loader from '@/app/shared/components/Loader';
import Modal from '@/app/shared/components/Modal';
import { IoIosWarning } from "react-icons/io";
import useLogout from '../hooks/useLogout';

export default function LogoutModal() {
  const [openModal, setOpenModal] = useState(false);
  const {logout, loading} = useLogout();

  const handleLogout = async () => {
    await logout(); 
    setOpenModal(false);
  };
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className="py-1 px-4 font-semibold text-red-500 2xl:mt-[0px] xl:mt-[0px] mt-[8px]"
      >
        Logout
      </button>

      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <div className="text-center max-w-[600px] p-5 z-[10]">
          <IoIosWarning size={35} className="mx-auto text-red-500" />
          <div className="mx-auto my-4">
            <h3 className="text-lg font-black text-gray-600">Logout</h3>
            <p className="text-[1.3em] text-gray-500">
              Are you sure you want to logout?
            </p>
          </div>
          <div className="flex gap-4 justify-center">
          <button onClick={() => handleLogout() } className="bg-red-500 hover:bg-red-600 rounded px-3 py-2 text-white w-[130px]">
            { loading ? <Loader /> : 'Logout' }
          </button>
          <button
            className="border border-slate-400 hover:bg-slate-400 hover:text-white rounded px-3 py-2 text-slate-700 w-[130px]"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
        </div>
      </Modal>
    </>
  )
}
