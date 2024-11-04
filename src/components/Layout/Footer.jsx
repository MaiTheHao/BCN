import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Footer({ ...rest }) {
  return (
    <footer {...rest}>
      <div className="webFooter__description">
        <h2>Cảm ơn bạn đã sử dụng trang web của chúng tôi</h2>
        <p>Chúng tôi luôn lắng nghe và cải thiện dịch vụ của mình</p>
        <span>Đây là một trang web phi lợi nhuận, phục vụ mục đích của chúng tôi</span>
      </div>
      <div className="webFooter__contact">
        <div className="webFooter__contact-element facebook">
          <FontAwesomeIcon icon={faFacebook} />
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </Link>
        </div>
        <div className="webFooter__contact-element gmail">
          <FontAwesomeIcon icon={faEnvelope} />
          <Link to="mailto:example@gmail.com" target="_blank" rel="noopener noreferrer">
            Gmail
          </Link>
        </div>
        <div className="webFooter__contact-element instagram">
          <FontAwesomeIcon icon={faInstagram} />
          <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
