import { useContext } from "react";
import { WebRTCContext } from "./webRTCProvider";

export const useWebRTC = () => {
    const context = useContext(WebRTCContext);

    if (!context) {
        throw new Error("useWebRTC must be used within a WebRTCProvider");
    }

    return context;
};
