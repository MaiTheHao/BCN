import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import './Unauthorized.scss'
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <FontAwesomeIcon icon={faExclamationTriangle} className="unauthorized-icon" />
      <h1>Không có quyền truy cập</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <Link to="/" className="link">Quay lại</Link>
    </div>
  )
}

export default Unauthorized