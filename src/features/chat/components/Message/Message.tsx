import { EntityId } from "@reduxjs/toolkit";
import { Typography } from "@mui/material";
import moment from "moment";
import { MouseEvent, useState } from "react";
import { MessageItem, MessageHeader } from "../styled";
import { MessageMenu } from "../MessageMenu";

type MessageProps = {
  id: EntityId;
  roomId: EntityId;
  text: string;
  userName?: string;
  date: string;
};

//TODO: Add avatars
//TODO: useMessage
//TODO: Create a popper menu
export const Message = ({ id, roomId, text, userName, date }: MessageProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MessageMenu onClose={handleClose} {...{ anchorEl, id, roomId }} />
      <MessageItem onClick={handleOpen}>
        <MessageHeader>
          <Typography color="primary" fontWeight="600" fontSize="small">
            {userName}
          </Typography>
        </MessageHeader>
        <Typography>{text}</Typography>
        <Typography
          color="primary"
          fontSize=".75rem"
          position={"absolute"}
          right=".75rem"
          bottom=".25rem"
        >
          {moment(date).format("h:mm a")}
        </Typography>
      </MessageItem>
    </>
  );
};
