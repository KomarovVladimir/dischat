import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hooks/storeHooks";
import { ConfirmationDialog } from "components/ConfirmationDialog";
import { messageRemoved } from "features/chat/slice/messagesSlice";
import { PopperMenu } from "components/PopperMenu";
import { useState } from "react";

type MessageMenuProps = {
    id: EntityId;
    roomId: EntityId;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

type ConfirmationProps = {
    title: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

//TODO: Think on moving confirmation dialogs to menu item components
export const MessageMenu = ({
    anchorEl,
    id,
    roomId,
    onClose
}: MessageMenuProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const [confirmation, setConfirmation] = useState<ConfirmationProps>({
        title: ""
    });

    const confirmations = {
        delete: {
            title: "Do you want to delete this message?",
            onConfirm: () => {
                dispatch(messageRemoved({ id, roomId }));
            },
            onCancel: () => {
                setOpen(false);
            }
        }
    } as Record<string, ConfirmationProps>;

    const handleConfirmationOpen = (action: string) => {
        setOpen(true);
        setConfirmation({ ...confirmations[action] });
    };

    const handleDelete = () => {
        handleConfirmationOpen("delete");
    };

    return (
        <>
            <ConfirmationDialog
                {...{
                    ...confirmation,
                    open
                }}
            />
            <PopperMenu
                {...{
                    anchorEl,
                    onClose,
                    menuItems: [
                        { text: "Edit", handler: onClose },
                        { text: "Copy", handler: onClose },
                        { text: "Delete", handler: handleDelete }
                    ]
                }}
            />
        </>
    );
};
