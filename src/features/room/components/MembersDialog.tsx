import {
    Button,
    DialogActions,
    Dialog,
    DialogContent,
    List,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemText
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Id } from "types";

import { useExcludeMemberMutation } from "../api";
import { useMembers } from "../hooks";

type MembersDialogProps = {
    roomId: string;
    open: boolean;
    onClose: () => void;
};

//TODO: Move the logic to a hook
export const MembersDialog = ({
    open,
    roomId,
    onClose
}: MembersDialogProps) => {
    const { members } = useMembers(roomId);
    const [excludeUser] = useExcludeMemberMutation();

    const handleExclude = (userId: Id) => () => {
        excludeUser({ roomId, userId });
    };

    return (
        <Dialog
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            {...{ open, onClose }}
        >
            <DialogTitle>Room members</DialogTitle>
            <DialogContent>
                <List dense>
                    {members?.map(({ id, username }) => (
                        <ListItem
                            key={id}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleExclude(id)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={username} />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
