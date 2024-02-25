import {
    Dialog,
    TextField,
    Button,
    DialogActions,
    DialogContent,
    Box,
    Divider,
    Stack,
    DialogTitle
} from "@mui/material";

import { Paper } from "components";

import { useRoomDialog } from "../hooks";

type CreationDialogProps = {
    open: boolean;
    onClose: () => void;
};

//TODO: Add i18n
//TODO: Add reject error handling
export const RoomDialog = ({ open, onClose }: CreationDialogProps) => {
    const { name, roomId, handleChange, handleSubmit, handleClose } =
        useRoomDialog(onClose);

    return (
        <Dialog onClose={handleClose} PaperComponent={Paper} {...{ open }}>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        {name && <DialogTitle>Create a new room</DialogTitle>}
                        {!roomId && (
                            <TextField
                                placeholder="Write a new room name"
                                autoFocus
                                disabled={Boolean(roomId)}
                                value={name}
                                onChange={handleChange("name")}
                                autoComplete="off"
                            />
                        )}
                        {!name && !roomId && <Divider>OR</Divider>}
                        {roomId && (
                            <DialogTitle>Join an existing room</DialogTitle>
                        )}
                        {!name && (
                            <TextField
                                placeholder="Paste a room roomId"
                                disabled={Boolean(name)}
                                value={roomId}
                                onChange={handleChange("roomId")}
                                autoComplete="off"
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!name && !roomId} type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
