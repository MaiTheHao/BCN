export const saveToLocalStorage = (key, value) => {
	try {
		const serializedValue = JSON.stringify(value);	
		localStorage.setItem(key, serializedValue);
	} catch (error) {
		console.error("Lỗi lưu vào localstorage", error);
	}
};

export const loadFromLocalStorage = (key) => {
	try {
		const serializedValue = localStorage.getItem(key);
		if (serializedValue === null) return undefined;
		return JSON.parse(serializedValue);
	} catch (error) {
		console.error("Lỗi tải dữ liệu từ localstorage", error);
		return undefined;
	}
};
