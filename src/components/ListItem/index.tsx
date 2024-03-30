import {
    ListItem as MuiListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItemProps,
    AvatarProps
} from "@mui/material";
import { ReactElement } from "react";

type IconTypes = ReactElement<AvatarProps>;

type ListProps = {
    icon?: IconTypes;
    text?: string;
};

export const ListItem = ({
    icon,
    text,
    ...props
}: ListProps & ListItemProps) => (
    <MuiListItem disablePadding {...props}>
        <ListItemButton dense>
            {icon && <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>}
            {text && <ListItemText primary={text} />}
        </ListItemButton>
    </MuiListItem>
);
