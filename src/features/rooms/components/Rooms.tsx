import { Avatar, List } from "@mui/material";

import { ListItem } from "components";

import { RoomDialog } from "./RoomDialog";
import { Room } from "./Room";

import { useRooms } from "../hooks";

export const Rooms = () => {
    const { rooms, creationOpen, handleOpen, handleClose } = useRooms();

    return (
        <List>
            <RoomDialog onClose={handleClose} open={creationOpen} />
            {rooms?.map((props, index) => <Room key={index} {...props} />)}
            <ListItem icon={<Avatar>+</Avatar>} onClick={handleOpen} />
        </List>
    );
};
