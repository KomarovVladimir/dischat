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
    onClose: () => void;
};

export const PopperMenu = ({
    anchorEl,
    menuItems,
    onClose
}: PopperMenuProps) => {
    const open = Boolean(anchorEl);

    return (
        <>
            <Popper placement="right-start" {...{ anchorEl, open }}>
                <Paper>
                    <ClickAwayListener onClickAway={onClose}>
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
