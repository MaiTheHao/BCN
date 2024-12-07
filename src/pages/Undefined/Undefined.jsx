import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import './Undefined.scss'
import { Link } from 'react-router-dom'

function Undefined() {
  return (
    <div className="undefined-container">
      <FontAwesomeIcon icon={faExclamationTriangle} className="undefined-icon" />
      <h1>Không tìm thấy trang</h1>
      <p>Không tìm thấy trang tại đường dẫn hiện tại.</p>
      <Link to="/" className="link">Quay lại</Link>
    </div>
  )
}

export default Undefined