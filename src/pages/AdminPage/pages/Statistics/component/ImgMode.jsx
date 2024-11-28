import React from "react";
import ProfilePreview from "../../../../../components/ProfilePreview/ProfilePreview";

function ImgMode({ filteredUsers, profileRefs }) {
	return (
		<>
			{filteredUsers.map((user, index) => (
				<ProfilePreview
					{...user}
					key={user.name + index}
					ref={(el) => (profileRefs.current[index] = el)}
					width={"60.7vw"}
				/>
			))}
		</>
	);
}

export default ImgMode;
