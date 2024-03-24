import {
    ClickAwayListener,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@mui/material";

type PopperMenuProps = {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
};

export const PopperMenu = ({ anchorEl, handleClose }: PopperMenuProps) => {
    const open = Boolean(anchorEl);

    return (
        <>
            <Popper placement="right-start" {...{ anchorEl, open }}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            id="composition-menu"
                            aria-labelledby="composition-button"
                        >
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Copy</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
};
