import { PropsWithChildren, createContext, useEffect } from "react";
import { WebRTCService } from "../services/WebRTCService ";

const webRTCService = new WebRTCService();

export const WebRTCContext = createContext(webRTCService);

export const WebRTCProvider = ({ children }: PropsWithChildren) => {
    useEffect(
        () => () => {
            webRTCService.closeAllConnections();
        },
        []
    );

    return (
        <WebRTCContext.Provider value={webRTCService}>
            {children}
        </WebRTCContext.Provider>
    );
};
