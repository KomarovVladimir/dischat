import PersonIcon from "@mui/icons-material/Person";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import { useUserSettings } from "../hooks/useUserSettings";

export const UserSettingsDialog = () => {
    const {
        open,
        handleClose,
        userName,
        handleConfirm,
        handleOpen,
        handleUserNameChange,
        handleKeyDown
    } = useUserSettings();

    return (
        <>
            <Dialog {...{ open }} onClose={handleClose}>
                <DialogContent>
                    <DialogTitle>Username</DialogTitle>
                    <TextField
                        placeholder="Write a new room name"
                        autoFocus
                        value={userName}
                        onChange={handleUserNameChange}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Submit</Button>
                </DialogActions>
            </Dialog>
            <IconButton aria-label="user-settings" onClick={handleOpen}>
                <PersonIcon />
            </IconButton>
        </>
    );
};
