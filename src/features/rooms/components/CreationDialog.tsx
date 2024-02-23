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

import { useCreationDialog } from "../hooks";

type CreationDialogProps = {
    open: boolean;
    onClose: () => void;
};

//TODO: Add i18n
export const CreationDialog = ({ open, onClose }: CreationDialogProps) => {
    const {
        inputValues: { name, code },
        handleChange,
        handleSubmit,
        handleClose
    } = useCreationDialog(onClose);

    return (
        <Dialog onClose={handleClose} PaperComponent={Paper} {...{ open }}>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={2}>
                        {name && <DialogTitle>Create a new room</DialogTitle>}
                        {!code && (
                            <TextField
                                placeholder="Write a new room name"
                                autoFocus
                                disabled={Boolean(code)}
                                value={name}
                                onChange={handleChange("name")}
                                autoComplete="off"
                            />
                        )}
                        {!name && !code && <Divider>OR</Divider>}
                        {code && (
                            <DialogTitle>Join an existing room</DialogTitle>
                        )}
                        {!name && (
                            <TextField
                                placeholder="Paste a room code"
                                disabled={Boolean(name)}
                                value={code}
                                onChange={handleChange("code")}
                                autoComplete="off"
                            />
                        )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={name === ""} type="submit">
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
