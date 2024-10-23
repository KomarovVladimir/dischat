import { PropsWithChildren, createContext, useEffect } from "react";
import { WebRTCService } from "../services/WebRTCService ";
import { useDispatch } from "react-redux";

const webRTCService = new WebRTCService();

export const WebRTCContext = createContext(webRTCService);

//TODO: Rework the redux streaming updates logic
export const WebRTCProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch();

  useEffect(() => {
    webRTCService.setDispatch(dispatch);

    return () => {
      webRTCService.closeAllConnections();
    };
  }, []);

  return (
    <WebRTCContext.Provider value={webRTCService}>
      {children}
    </WebRTCContext.Provider>
  );
};
