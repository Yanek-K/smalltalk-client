import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";

const MyButton = ({ children, onClick, tip, btnClassName, tipClassName }) => {
  return (
    <div>
      <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
          {children}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default MyButton;
