import React from 'react'
import { logout } from '../redux-toolkit/reducers/authReducer'
import {useDispatch} from 'react-redux'

const AdminNav = () => {
  const dispatch = useDispatch();

  const adminLogout = () => {
    dispatch(logout());
  }

  return (
    <>
        <nav className="fixed left-64 top-4 right-0 mx-4">
            <div className="bg-gray-800 w-full flex justify-end p-4">
                <button onClick={adminLogout} className="py-2 px-4 bg-indigo-600 text-white rounded-md capitalize">logout</button>
            </div>
        </nav>
    </>
  )
}

export default AdminNav
