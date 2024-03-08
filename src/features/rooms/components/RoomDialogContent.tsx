import {
    TextField,
    DialogContent,
    Divider,
    Stack,
    DialogTitle
} from "@mui/material";

import { DialogStates, type FieldNames } from "../hooks/useRoomDialog";

type RoomDialogContentProps = {
    state: DialogStates;
    name: string;
    answer: string;
    description: string;
    handleChange: (
        field: FieldNames
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RoomDialogContent = ({
    state,
    name,
    answer,
    description,
    handleChange
}: RoomDialogContentProps) => {
    return (
        <DialogContent>
            <Stack spacing={2}>
                {[
                    DialogStates.INITIAL,
                    DialogStates.ADDING,
                    DialogStates.ANSWER
                ].includes(state) && (
                    <>
                        {[DialogStates.INITIAL, DialogStates.ADDING].includes(
                            state
                        ) && (
                            <>
                                <DialogTitle>Create a new room</DialogTitle>
                                <TextField
                                    placeholder="Write a new room name"
                                    autoFocus
                                    disabled={Boolean(description)}
                                    value={name}
                                    onChange={handleChange("name")}
                                    autoComplete="off"
                                />
                            </>
                        )}
                        {state === DialogStates.ANSWER && (
                            <>
                                <DialogTitle>Paste an answer</DialogTitle>
                                <TextField
                                    placeholder="Answer"
                                    autoFocus
                                    disabled={Boolean(description)}
                                    value={answer}
                                    onChange={handleChange("answer")}
                                    autoComplete="off"
                                />
                            </>
                        )}
                    </>
                )}
                {state === DialogStates.INITIAL && <Divider>OR</Divider>}
                {[DialogStates.INITIAL, DialogStates.JOINING].includes(
                    state
                ) && (
                    <>
                        <DialogTitle>Join an existing room</DialogTitle>
                        <TextField
                            placeholder="Paste a Session Description Protocol"
                            disabled={Boolean(name)}
                            value={description}
                            onChange={handleChange("description")}
                            autoComplete="off"
                        />
                    </>
                )}
            </Stack>
        </DialogContent>
    );
};
