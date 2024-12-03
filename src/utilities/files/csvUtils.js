export function generateCSV(dataArray) {
	const headers = Object.keys(dataArray[0]).join(",");
	const rows = dataArray.map((data) => Object.values(data).join(",")).join("\n");
	return `${headers}\n${rows}`;
}