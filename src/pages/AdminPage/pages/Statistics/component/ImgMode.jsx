import React from "react";
import ProfilePreview from "../../../../../components/ProfilePreview/ProfilePreview";

function ImgMode({filteredUsers, profileRefs}) {
	return (
		<>
			{filteredUsers.map((user, index) => (
				<ProfilePreview
					key={user.name + index}
					name={user.name}
					className={user.className}
					khoa={user.khoa}
					profilePic={user.profilePic}
					ref={(el) => (profileRefs.current[index] = el)}
					width={"60.7vw"}
				/>
			))}
		</>
	);
}

export default ImgMode;
