import React from 'react'
import ErrorPage from '../ErrorPage.jsx/ErrorPage'

function Undefined() {
  return (
    <ErrorPage
      title="Không tìm thấy trang"
      description="Không tìm thấy trang tại đường dẫn hiện tại."
      comeBackToMessage="Quay lại"
      comeBackTo="/"
      color="#ff8800"
    />
  )
}

export default Undefined