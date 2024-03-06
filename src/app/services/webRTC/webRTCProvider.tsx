import { PropsWithChildren, createContext, useContext } from "react";
import { WebRTCService } from "services/WebRTCService ";

const webRTCService = new WebRTCService();

export const WebRTCContext = createContext(webRTCService);

export const useWebRTC = () => {
    const context = useContext(WebRTCContext);

    if (!context) {
        throw new Error("useWebRTC must be used within a WebRTCProvider");
    }

    return context;
};

export const WebRTCProvider = ({ children }: PropsWithChildren) => (
    <WebRTCContext.Provider value={webRTCService}>
        {children}
    </WebRTCContext.Provider>
);
