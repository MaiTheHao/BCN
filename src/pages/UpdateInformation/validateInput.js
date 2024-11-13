import Swal from "sweetalert2";

function validateInput(data){
    if (!data.name) {
        Swal.fire('Thông báo', 'Vui lòng nhập tên', 'warning');
        return false;
    }
    if (!data.className) {
        Swal.fire('Thông báo', 'Vui lòng nhập lớp', 'warning');
        return false;
    }
    if (!data.khoa) {
        Swal.fire('Thông báo', 'Vui lòng nhập khoa', 'warning');
        return false;
    }
    if (!data.profilePic) {
        Swal.fire('Thông báo', 'Vui lòng tải lên ảnh đại diện', 'warning');
        return false;
    }
    return true;
}

export default validateInput;