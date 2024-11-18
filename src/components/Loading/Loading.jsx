import React from "react";
import { faSnowflake } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./main.scss";

function Loading({ message = "Đang tải" }) {
	return (
		<div id="comp-loading">
			<div className="loading-container">
				<FontAwesomeIcon icon={faSnowflake} />
			</div>
			<span>{message}</span>
		</div>
	);
}

export default Loading;
