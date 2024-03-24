import {
    ClickAwayListener,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@mui/material";

type PopperMenuProps = {
    anchorEl: HTMLElement | null;
    menuItems: {
        text: string;
        handler: () => void;
    }[];
    handleClose: () => void;
};

export const PopperMenu = ({
    anchorEl,
    menuItems,
    handleClose
}: PopperMenuProps) => {
    const open = Boolean(anchorEl);

    return (
        <>
            <Popper placement="right-start" {...{ anchorEl, open }}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                            {menuItems.map(({ text, handler }, index) => (
                                <MenuItem key={index} onClick={handler}>
                                    {text}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    );
};
