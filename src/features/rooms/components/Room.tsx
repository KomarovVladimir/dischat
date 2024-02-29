import { Avatar } from "@mui/material";

import { ListItem } from "components";
import { stringAvatar } from "lib";
import { Id } from "types";

import { useRoom } from "../hooks/useRoom";

export type RoomProps = {
    id: Id;
    name: string;
    imgSrc?: string;
};

//TODO: Add area attributes
//TODO: Add an deleting alert dialog
export const Room = ({ id, imgSrc, name }: RoomProps) => {
    const { handleNavigate } = useRoom(id);

    return (
        <ListItem
            onClick={handleNavigate}
            icon={
                imgSrc ? (
                    <Avatar src={imgSrc} />
                ) : (
                    <Avatar {...stringAvatar(name)} />
                )
            }
        />
    );
};
