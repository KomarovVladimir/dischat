import {
    Dialog,
    TextField,
    Button,
    DialogActions,
    DialogTitle,
    DialogContent,
    Box
} from "@mui/material";

import { Paper } from "components";

import { useCreationDialog } from "../hooks";

type CreationDialogProps = {
    open: boolean;
    onClose: () => void;
};

//TODO: Add i18n
//TODO: Make a common component
export const CreationDialog = ({ open, onClose }: CreationDialogProps) => {
    const { name, handleChange, handleSubmit, handleClose } =
        useCreationDialog(onClose);

    return (
        <Dialog onClose={handleClose} PaperComponent={Paper} {...{ open }}>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle>Add a new room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={name}
                        onChange={handleChange}
                        autoComplete="off"
                    />
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
