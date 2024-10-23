import { useAppDispatch } from "app/hooks/storeHooks";
import { useState } from "react";
import { messageRemoved } from "../slice/messagesSlice";
import { type MessageMenuProps } from "../components/MessageMenu";
import { getMessageById } from "../slice/selectors";

type ConfirmationProps = {
  title: string;
  onConfirm?: () => void;
  onCancel: () => void;
};

export const useMessageMenu = ({
  id,
  roomId,
  onClose
}: Pick<MessageMenuProps, "id" | "roomId" | "onClose">) => {
  const dispatch = useAppDispatch();
  const { text } = getMessageById(id);
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

  const handleCopyToClipboard = () => {
    onClose();
    navigator.clipboard.writeText(text);
  };

  return { open, confirmation, handleDelete, handleCopyToClipboard };
};
