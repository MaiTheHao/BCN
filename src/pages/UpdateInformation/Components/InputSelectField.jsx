import React, { useState, useEffect, useRef, useCallback } from 'react';

function InputSelectField({ title, id = "", customClassName = "", listOptions, Faicon = "", handleSetData, defaultValue, ...inputRest}) {
	const [showList, setShowList] = useState(false);
	const [inputValue, setInputValue] = useState(defaultValue || "");
	const [filteredOptions, setFilteredOptions] = useState(listOptions);
	const inputSelectFieldRef = useRef(null);

	const handleClickOutside = useCallback((event) => {
		if (inputSelectFieldRef.current && !inputSelectFieldRef.current.contains(event.target)) {
			setShowList(false);
		}
	}, []);

	const handleSetSelectedValue = (value) => {
		setInputValue(value);
		handleSetData(value);
		setShowList(false);
	};

	const handleInputChange = (e) => {
		const { value } = e.target;
		setInputValue(value);
		handleSetData(value);
		setFilteredOptions(listOptions.filter((option) => option.toLowerCase().includes(value.toLowerCase())));
	};

	const renderOptionsList = () => (
		<ul>
			{filteredOptions.map((option, index) => (
				<li key={index} onClick={() => handleSetSelectedValue(option)}>
					{option}
				</li>
			))}
		</ul>
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClickOutside]);

	useEffect(() => {
		setInputValue(defaultValue || "");
	}, [defaultValue]);

	return (
		<div className={`inputSelectField field ${customClassName}`} ref={inputSelectFieldRef}>
			<label htmlFor={id}>{title}</label>
			<input
				type="text"
				id={id}
				onChange={handleInputChange}
				onFocus={() => setShowList(true)}
				{...inputRest}
				value={inputValue}
			/>
			{showList && <div className="wrapper webHeader-right__nav-wrapper">{renderOptionsList()}</div>}
		</div>
	);
}

export default InputSelectField;