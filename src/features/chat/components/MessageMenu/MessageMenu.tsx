import { EntityId } from "@reduxjs/toolkit";
import { ConfirmationDialog } from "components/ConfirmationDialog";
import { PopperMenu } from "components/PopperMenu";
import { useMessageMenu } from "features/chat/hooks/useMessageMenu";

export type MessageMenuProps = {
    id: EntityId;
    roomId: EntityId;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

//TODO: Think on moving confirmation dialogs to menu item components for better api
export const MessageMenu = ({
    anchorEl,
    id,
    roomId,
    onClose
}: MessageMenuProps) => {
    const { open, confirmation, handleDelete } = useMessageMenu({ id, roomId });

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
