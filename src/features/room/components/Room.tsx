import { Grid, List } from "@mui/material";
import { useParams } from "react-router";

import { Chat } from "features";
import { PageWrapper } from "components";
import { statuses } from "common/constants";

import { Item } from "./Item";
import { RoomAppBar } from "./RoomAppBar";
import { ItemInput } from "./ItemInput";
import { useItems, useRoom } from "../hooks";

type RoomProps = {
    id: string;
};

export const RoomLegacy = () => {
    const { roomId } = useParams() as { roomId: string };

    return <RoomContent id={roomId} />;
};

const RoomContent = ({ id }: RoomProps) => {
    const { status } = useRoom(id);
    const { items = [] } = useItems();
    const showInput = Boolean(status === statuses[0] && items.length < 10);

    return (
        <PageWrapper>
            <RoomAppBar roomId={id} />
            <Grid
                container
                spacing={2}
                rowSpacing="0"
                sx={{ height: "calc(100vh - 10rem)" }}
            >
                <Grid item xs={6} sx={{ height: "100%" }}>
                    <Chat />
                </Grid>
                <Grid item xs={6}>
                    <List dense disablePadding>
                        {items?.map(({ id, name, votes, voted }) => (
                            <Item
                                key={id}
                                {...{ id, name, votes, status, voted }}
                            />
                        ))}
                    </List>
                    {showInput && <ItemInput />}
                </Grid>
            </Grid>
        </PageWrapper>
    );
};
