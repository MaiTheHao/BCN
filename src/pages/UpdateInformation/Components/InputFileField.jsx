import React from "react";

function InputFileField({ id = "", title = "", customAccept = "", handle }) {
	return (
		<div className="input-file field">
			<label htmlFor={id}>{title}</label>
			<input id={id} type="file" accept={customAccept || ""} onChange={handle || (() => {})} />
		</div>
	);
}

export default InputFileField;
