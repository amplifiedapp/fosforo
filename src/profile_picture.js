import React from "react";
import {Spring, presets as motionPresets} from "react-motion";

const config = [253, 20];

const getEndValue = (prevValue, props) => {
  const left = props.open ? (prevValue.val.left > 100 ? props.listPosition.left : 150) : 5;
  const top = props.open ? (prevValue.val.top > 30 ? props.listPosition.top : 50) : 5;
  const size = props.open ? (prevValue.val.left > 300 ? 300 : 100) : 30;
  const radius = props.open ? (prevValue.val.left > 300 ? 0 : 50) : 100
  const border = props.open ? true : false;
  return {val: {size, left, top, radius}, config};
}

const ProfilePicture = (props) => (
  <Spring
    defaultValue={{val: {size: 30, left: 5, top: 5, radius: 100}, config}}
    endValue={(prevValue) => getEndValue(prevValue, props)} >
    {ip =>
      <div className="profilePicture" onClick={props.onClick}
        style={{
          left: `${ip.val.left}`,
          top: `${ip.val.top}`,
          width: `${ip.val.size}px`,
          height: `${ip.val.size}px`,
          borderRadius: `${ip.val.radius}%`,
        }}
      ></div>
    }
  </Spring>
);

export default ProfilePicture;
