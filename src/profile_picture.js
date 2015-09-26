import React from "react";
import {Spring, presets as motionPresets} from "react-motion";

const config = [253, 20];

const getEndValue = (prevValue, props) => {
  const right = props.open ? (prevValue.val.right > 100 ? 600 : 150) : 5;
  const top = props.open ? (prevValue.val.top > 100 ? 200 : 150) : 5;
  const size = props.open ? (prevValue.val.right > 300 ? 200 : 100) : 30;
  const radius = props.open ? (prevValue.val.right > 300 ? 0 : 50) : 100
  const border = props.open ? true : false;
  return {val: {size, right, top, radius, border}, config};
}

const ProfilePicture = (props) => (
  <Spring
    defaultValue={{val: {size: 30, right: 5, top: 5, radius: 100, border: false}, config}}
    endValue={(prevValue) => getEndValue(prevValue, props)} >
    {ip =>
      <div className="profilePicture" onClick={props.onClick}
        style={{
          right: `${ip.val.right}`,
          top: `${ip.val.top}`,
          width: `${ip.val.size}px`,
          height: `${ip.val.size}px`,
          borderRadius: `${ip.val.radius}%`,
          border: ip.val.border ? "2px solid black" : "none"
        }}
      ></div>
    }
  </Spring>
);

export default ProfilePicture;
