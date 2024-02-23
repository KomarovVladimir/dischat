import { MenuItem, Button, Snackbar, Stack, Select } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

import { AppBar, Title, TitleLink } from "components";
import { statuses } from "common/constants";

import { MembersDialog } from "./MembersDialog";

import { useRoom } from "../hooks";
import { useMembers } from "../hooks";

type RoomAppBarProps = {
    roomId: string;
};

//TODO: Update the breadcrumbs
//TODO: Split code. Rework the menu buttons
//TODO: Add a members number selector
export const RoomAppBar = ({ roomId }: RoomAppBarProps) => {
    const {
        name,
        status,
        snackbarOpen,
        handleCopy,
        handleStatusChange,
        handleSnackbarClose
    } = useRoom(roomId);
    const {
        members,
        membersDialogOpen,
        handleMembersOpen,
        handleMembersClose
    } = useMembers(roomId);

    return (
        <>
            <Snackbar
                message="Copied to clipboard"
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                open={snackbarOpen}
            />
            <MembersDialog
                open={membersDialogOpen}
                onClose={handleMembersClose}
                {...{ members, roomId }}
            />
            <AppBar
                leftBlock={
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <TitleLink component={Link} to="/rooms">
                            Rooms
                        </TitleLink>
                        <ArrowBackIosNewIcon fontSize="small" />
                        <Title>{name}</Title>
                    </Stack>
                }
                menu={
                    <Stack gap={2} direction="row" mr={2} alignItems="center">
                        <Select
                            name="status-select"
                            value={status}
                            onChange={handleStatusChange}
                            variant="standard"
                            sx={{ minWidth: 120 }}
                        >
                            {statuses.map((value, index) => (
                                <MenuItem key={index} {...{ value }}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            sx={{ color: "#fff" }}
                            onClick={handleMembersOpen}
                            startIcon={<PersonIcon />}
                        >
                            {members?.length || 0}
                        </Button>
                        <Button
                            onClick={handleCopy(roomId)}
                            endIcon={
                                <ContentCopyIcon
                                    sx={{ height: "1rem", width: "1rem" }}
                                />
                            }
                            sx={{
                                padding: ".5rem .75rem",
                                color: "#fff",
                                borderRadius: ".5rem",
                                border: " 1px solid #383c47",
                                background: " rgba(203, 227, 255, 0.10)",
                                boxShadow:
                                    "8px 16px 24px 0px rgba(0, 0, 0, 0.16)",
                                backdropFilter: "blur(8px)"
                            }}
                        >
                            Room id: {roomId}
                        </Button>
                    </Stack>
                }
            />
        </>
    );
};
