import React from 'react'
import { useRecoilValue } from 'recoil'
import User from '../../store/atom/userProfile'

function UserHome() {
    const userData=useRecoilValue(User);
  return (
    <div>UserHome</div>
  )
}

export default UserHome