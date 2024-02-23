import { Avatar, Grid, List } from "@mui/material";

import { ListItem } from "components";

import { CreationDialog } from "./CreationDialog";

import { useRooms } from "../hooks";

export const Rooms = () => {
    const { rooms, creationOpen, handleOpen, handleClose } = useRooms();

    console.log(rooms);

    return (
        <List>
            <CreationDialog onClose={handleClose} open={creationOpen} />
            <Grid container spacing={2}>
                {/* {rooms?.map((props, index) => (
                    <Room
                        key={index}
                        {...props}
                        icon={<Avatar>{index.toString()}</Avatar>}
                    />
                ))
                } */}
                <ListItem icon={<Avatar>+</Avatar>} onClick={handleOpen} />
            </Grid>
        </List>
    );
};
