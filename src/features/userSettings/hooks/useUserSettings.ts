import { useLocalStorage } from "app/hooks/useLocalStorage";
import { KeyboardEvent, ChangeEvent, useEffect, useState } from "react";

export const useUserSettings = () => {
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const {
        value: localUserName,
        setItem,
        removeItem
    } = useLocalStorage("userName");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value);
    };

    const handleConfirm = () => {
        if (userName) {
            setItem(userName);
        } else {
            removeItem();
        }
        handleClose();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();

            handleConfirm();
        }
    };

    useEffect(() => {
        if (localUserName) {
            setUserName(localUserName);
        }
    }, [localUserName]);

    return {
        open,
        handleClose,
        userName,
        handleConfirm,
        handleOpen,
        handleUserNameChange,
        handleKeyDown
    };
};
