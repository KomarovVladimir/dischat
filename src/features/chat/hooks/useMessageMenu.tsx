import { useAppDispatch } from "app/hooks/storeHooks";
import { useState } from "react";
import { messageRemoved } from "../slice/messagesSlice";
import { type MessageMenuProps } from "../components/MessageMenu";

type ConfirmationProps = {
    title: string;
    onConfirm?: () => void;
    onCancel: () => void;
};

export const useMessageMenu = ({
    id,
    roomId
}: Pick<MessageMenuProps, "id" | "roomId">) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [confirmation, setConfirmation] = useState<ConfirmationProps>({
        title: "",
        onCancel: () => {
            setOpen(false);
        }
    });

    const handleConfirmationOpen = (action: string) => {
        setOpen(true);
        setConfirmation({
            ...confirmation,
            title: "Do you want to delete this message?",
            onConfirm: () => {
                dispatch(messageRemoved({ id, roomId }));
            }
        });
    };

    const handleDelete = () => {
        handleConfirmationOpen("delete");
    };

    return { open, confirmation, handleDelete };
};
