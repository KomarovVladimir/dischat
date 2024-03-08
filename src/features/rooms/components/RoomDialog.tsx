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

import { useRoomDialog } from "../hooks/useRoomDialog";

type CreationDialogProps = {
    open: boolean;
    onClose: () => void;
};

//TODO: Add i18n
//TODO: Add reject error handling
export const RoomDialog = ({ open, onClose }: CreationDialogProps) => {
    const { name, description, handleChange, handleSubmit, handleClose } =
        useRoomDialog(onClose);

    return (
        <Dialog onClose={handleClose} PaperComponent={Paper} {...{ open }}>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        {name && <DialogTitle>Create a new room</DialogTitle>}
                        {!description && (
                            <TextField
                                placeholder="Write a new room name"
                                autoFocus
                                disabled={Boolean(description)}
                                value={name}
                                onChange={handleChange("name")}
                                autoComplete="off"
                            />
                        )}
                        {!name && !description && <Divider>OR</Divider>}
                        {description && (
                            <DialogTitle>Join an existing room</DialogTitle>
                        )}
                        {!name && (
                            <TextField
                                placeholder="Paste a Session Description Protocol"
                                disabled={Boolean(name)}
                                value={description}
                                onChange={handleChange("description")}
                                autoComplete="off"
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!name && !description} type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
