import { PropsWithChildren, createContext } from "react";
import { WebRTCService } from "../services/WebRTCService ";

const webRTCService = new WebRTCService();

export const WebRTCContext = createContext(webRTCService);

export const WebRTCProvider = ({ children }: PropsWithChildren) => (
    <WebRTCContext.Provider value={webRTCService}>
        {children}
    </WebRTCContext.Provider>
);
