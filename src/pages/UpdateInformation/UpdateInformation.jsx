import React from 'react'
import EditUserForm from '../../components/EditUserForm/EditUserForm'
import { auth } from '../../../backend/configs/database'
import useAppContext from '../../contexts/App/useAppContext'

function UpdateInformation() {
	const {userData, updateUserData} = useAppContext();
	const UID = auth.currentUser.uid;
  return (
	<EditUserForm UID={UID} userData={userData} updateUserData={updateUserData} isJustOne={false}/>
  )
}

export default UpdateInformation