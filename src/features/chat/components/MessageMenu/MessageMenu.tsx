import { PopperMenu } from "components/PopperMenu";

type MessageMenuProps = {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
};

export const MessageMenu = ({ anchorEl, handleClose }: MessageMenuProps) => (
    <PopperMenu
        {...{
            anchorEl,
            handleClose,
            menuItems: [
                { text: "Edit", handler: handleClose },
                { text: "Update", handler: handleClose },
                { text: "Delete", handler: handleClose }
            ]
        }}
    />
);
