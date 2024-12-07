import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import './ErrorPage.scss'
import { Link } from 'react-router-dom'

function ErrorPage({ title, description, comeBackToMessage = "Quay lại", comeBackTo = "/", color }) {
  return (
    <div className="errorpage-container" style={{ color }}>
      <FontAwesomeIcon icon={faExclamationTriangle} className="errorpage-icon" />
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={comeBackTo} className="link">{comeBackToMessage}</Link>
    </div>
  )
}

export default ErrorPage