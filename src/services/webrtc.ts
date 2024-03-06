//TODO: Wrap into a class?
export interface RTCEventHandlers {
    onDataChannelClosed: () => void;
    onDataChannelOpened: (dataChannel: RTCDataChannel) => void;
    onIceCandidate: (candidate: RTCIceCandidate) => void;
    onMessageReceived: (message: string) => void;
    onRemoteStreamTrack: (track: MediaStreamTrack) => void;
}

export async function init() {
    const connection = new RTCPeerConnection();

    return connection;
}

export async function createAndSetOffer(connection: RTCPeerConnection) {
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    return offer;
}

export async function setRemoteDescription(
    connection: RTCPeerConnection,
    remoteDescription: RTCSessionDescriptionInit
) {
    connection.setRemoteDescription(remoteDescription);
}

export function setEventHandlers(
    dataChannel: RTCDataChannel,
    eventHandlers: RTCEventHandlers
) {
    dataChannel.onopen = () => {
        eventHandlers.onDataChannelOpened(dataChannel);
    };

    dataChannel.onmessage = (event) => {
        const message = event.data;
        eventHandlers.onMessageReceived(message);
    };

    dataChannel.onclose = () => {
        eventHandlers.onDataChannelClosed();
    };
}

export function createDataChannel(
    connection: RTCPeerConnection,
    label: string,
    eventHandlers: RTCEventHandlers
) {
    const dataChannel = connection.createDataChannel(label);

    setEventHandlers(dataChannel, eventHandlers);
}

export async function sendMessage(
    dataChannel: RTCDataChannel,
    message: string
) {
    dataChannel.send(message);
}
