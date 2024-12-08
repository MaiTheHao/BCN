import React from 'react';

function InputField({ title, type = "text", id = "", name = "", placeholder = "", customClassName = "", ...inputRest }) {
	return (
		<div className={`inputField field ${customClassName}`}>
			<label htmlFor={id}>{title}</label>
			<input type={type} id={id} name={name} placeholder={placeholder} {...inputRest} />
		</div>
	);
}

export default React.memo(InputField);