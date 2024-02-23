import { Button, Grid, Stack } from "@mui/material";

import { AppBar, PageWrapper, Title } from "components";

import { CreationDialog } from "./CreationDialog";
import { RoomCard } from "./RoomCard";

import { useRoomsManager } from "../hooks";

export const RoomsManagerLegacy = () => {
    const { rooms, creationOpen, handleOpen, handleClose, handleJoiningOpen } =
        useRoomsManager();

    return (
        <PageWrapper>
            <AppBar
                leftBlock={<Title>Rooms</Title>}
                menu={
                    <Stack gap={2} direction="row" mr={2} alignItems="center">
                        <Button sx={{ color: "#fff" }} onClick={handleOpen}>
                            + New Room
                        </Button>
                        <Button
                            sx={{ color: "#fff" }}
                            onClick={handleJoiningOpen}
                        >
                            Join
                        </Button>
                    </Stack>
                }
            />
            <CreationDialog onClose={handleClose} open={creationOpen} />
            <Grid container spacing={2}>
                {rooms?.map((props, index) => (
                    <Grid key={index} item xs={3}>
                        <RoomCard {...props} />
                    </Grid>
                ))}
            </Grid>
        </PageWrapper>
    );
};
