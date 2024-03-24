import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type ConfirmationDialogProps = {
    open: boolean;
    title: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export const ConfirmationDialog = ({
    open,
    title,
    onConfirm,
    onCancel
}: ConfirmationDialogProps) => (
    <Dialog {...{ open }}>
        <DialogTitle>{title}</DialogTitle>
        <DialogActions>
            <Button autoFocus onClick={onCancel}>
                Cancel
            </Button>
            <Button onClick={onConfirm}>Ok</Button>
        </DialogActions>
    </Dialog>
);
