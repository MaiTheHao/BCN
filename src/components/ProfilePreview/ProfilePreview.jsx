import { forwardRef, useState } from "react";
import Draggable from "react-draggable";
import "./ProfilePreview.scss";

const ProfilePreview = forwardRef(({ name, className, khoa, profilePic, draggable = true, onProfilePicPositionChange, onDetailsPositionChange }, ref) => {
    const [profilePicPosition, setProfilePicPosition] = useState({ x: 0, y: 0 });
    const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });

    const handleStop = (e, data, setPosition, onPositionChange) => {
        const parent = e.target.parentElement;
        const parentRect = parent.getBoundingClientRect();
        const xRatio = data.x / parentRect.width;
        const yRatio = data.y / parentRect.height;
        const newPosition = { x: xRatio, y: yRatio };
        setPosition(newPosition);
        if (onPositionChange) {
            onPositionChange(newPosition);
        }
    };

    const renderDraggable = (children, handleStop, setPosition, onPositionChange) => {
        return draggable ? (
            <Draggable handle=".draggable-handle" onStop={(e, data) => handleStop(e, data, setPosition, onPositionChange)}>
                {children}
            </Draggable>
        ) : (
            children
        );
    };

    return (
        <div className="info-preview small-preview" ref={ref}>
            <div className="info-preview-top">
                <p>BỘ CÔNG THƯƠNG</p>
                <h2>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</h2>
                <h1>SINH VIÊN</h1>
            </div>
            <div className="info-preview-body">
                {renderDraggable(
                    <div className={`info-preview-body__profilePic ${draggable ? "draggable-handle" : ""}`}>
                        {profilePic && <img src={profilePic} alt="Profile" />}
                    </div>,
                    handleStop,
                    setProfilePicPosition,
                    onProfilePicPositionChange
                )}
                {renderDraggable(
                    <div className={`info-preview-body__details ${draggable ? "draggable-handle" : ""}`}>
                        <p className="name">{name}</p>
                        <p className="class">
                            Lớp: <strong>{className}</strong>
                        </p>
                        <p className="chuyennganh">
                            Chuyên ngành: <strong>{khoa}</strong>
                        </p>
                    </div>,
                    handleStop,
                    setDetailsPosition,
                    onDetailsPositionChange
                )}
            </div>
            {/* <div>
                <p>Profile Pic Position: {`x: ${profilePicPosition.x.toFixed(2)}, y: ${profilePicPosition.y.toFixed(2)}`}</p>
                <p>Details Position: {`x: ${detailsPosition.x.toFixed(2)}, y: ${detailsPosition.y.toFixed(2)}`}</p>
            </div> */}
        </div>
    );
});

export default ProfilePreview;
