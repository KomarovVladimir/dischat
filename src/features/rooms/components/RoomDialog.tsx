import { Dialog, Button, DialogActions } from "@mui/material";

import { Paper } from "components";

import { useRoomDialog } from "../hooks/useRoomDialog";
import { RoomDialogContent } from "./RoomDialogContent";

type CreationDialogProps = {
    open: boolean;
    onClose: () => void;
};

//TODO: Add i18n
//TODO: Add reject error handling
export const RoomDialog = ({ open, onClose }: CreationDialogProps) => {
    const {
        name,
        state,
        answer,
        description,
        handleChange,
        handleSubmit,
        handleClose
    } = useRoomDialog(onClose);

    return (
        <Dialog onClose={handleClose} PaperComponent={Paper} {...{ open }}>
            <RoomDialogContent
                {...{
                    name,
                    state,
                    answer,
                    description,
                    handleChange
                }}
            />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!name && !description} onClick={handleSubmit}>
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};
