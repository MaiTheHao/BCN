import React from "react";

function TableMode({filteredUsers}) {
	return (
		<table>
			<thead>
				<tr>
					<th className="stt">STT</th>
					<th>Họ và Tên</th>
					<th>Chuyên ngành</th>
					<th>Lớp danh nghĩa</th>
				</tr>
			</thead>
			<tbody>
				{filteredUsers.map((user, index) => (
					<tr key={user.name + index}>
						<td className="stt">{index + 1}</td>
						<td>{user?.name}</td>
						<td>{user?.chuyen_nganh?.toUpperCase()}</td>
						<td>{user?.className + user?.khoa + user?.lop}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default TableMode;
