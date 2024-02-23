import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { statuses } from "common/constants";

import { ListItem } from "./styled";

import { useItems } from "../hooks";
import { ItemData, RoomData } from "../types";

type ItemProps = Omit<ItemData, "roomId"> & Pick<RoomData, "status">;

export const Item = ({ id, name, votes, status, voted }: ItemProps) => {
    const { handleItemClick, handleRemoveItem } = useItems();
    const disabled = status !== statuses[1];

    return (
        <ListItem
            secondaryAction={
                <>
                    {status === statuses[0] && (
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={handleRemoveItem(id)}
                        >
                            <CloseIcon />
                        </IconButton>
                    )}
                </>
            }
            {...{ disabled }}
        >
            <ListItemButton
                role={undefined}
                onClick={handleItemClick(voted, id)}
                dense
                {...{ disabled }}
            >
                <ListItemText primary={name} secondary={votes} />
            </ListItemButton>
        </ListItem>
    );
};
