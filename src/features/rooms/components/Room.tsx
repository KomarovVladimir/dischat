import { EntityId } from "@reduxjs/toolkit";
import { Avatar } from "@mui/material";

import { ListItem } from "components";
import { stringAvatar } from "lib";

import { useRoom } from "../hooks/useRoom";

type RoomProps = {
  id: EntityId;
  name: string;
  imgSrc?: string;
};

//TODO: Add area attributes
//TODO: Add an deleting alert dialog
export const Room = ({ id, imgSrc, name }: RoomProps) => {
  const { handleNavigate } = useRoom(id);

  return (
    <ListItem
      sx={{ mb: 2 }}
      onClick={handleNavigate}
      icon={
        imgSrc ? <Avatar src={imgSrc} /> : <Avatar {...stringAvatar(name)} />
      }
    />
  );
};
