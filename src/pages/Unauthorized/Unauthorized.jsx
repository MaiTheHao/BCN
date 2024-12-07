import React from 'react'
import ErrorPage from '../ErrorPage.jsx/ErrorPage'

function Unauthorized() {
  return (
    <ErrorPage
      title="Không có quyền truy cập"
      description="Bạn không có quyền truy cập vào trang này."
      comeBackToMessage="Quay lại"
      comeBackTo="/"
      color="#ff0000"
    />
  )
}

export default Unauthorized