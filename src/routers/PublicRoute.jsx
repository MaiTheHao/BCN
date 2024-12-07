import React from 'react'
import { Outlet } from 'react-router-dom'

function PublicRoute() {
  return <Outlet/>
}

export default React.memo(PublicRoute);