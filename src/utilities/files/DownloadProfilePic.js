import * as htmlToImage from "html-to-image";
import Swal from "sweetalert2";

async function handleDownloadProfilePic(ProfileRef, fileName = "profile-pic", format = "png") {
    if (ProfileRef.current === null) return;

    try {
        let url;
        if (format === "jpg") {
            url = await htmlToImage.toJpeg(ProfileRef.current, { quality: 0.92 });
        } else {
            let blob = await htmlToImage.toBlob(ProfileRef.current);
            url = URL.createObjectURL(blob);
        }

        const link = document.createElement("a");
        link.download = `${fileName}.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
        
        Swal.fire({
            icon: "error",
            title: "Lỗi!",
            text: "Đã có lỗi xảy ra khi tải ảnh",
        });
    }
}

export default handleDownloadProfilePic;