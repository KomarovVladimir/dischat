export class WebRTCService {
    private connections: Record<string, RTCPeerConnection> = {};
    private dataChannels: Record<string, RTCDataChannel> = {};

    createConnection(id: string) {
        if (!this.connections[id]) {
            console.log(`${id}: Creating connection`);

            this.connections[id] = new RTCPeerConnection();

            console.log(`${id}: Connection created`);

            this.connections[id].onicecandidate = ({ candidate }) => {
                if (candidate) {
                    console.log("ICE candidate:", candidate);
                } else {
                    console.log("ICE gathering complete");
                }
            };

            this.connections[id].onicegatheringstatechange = (event) => {
                if (this.connections[id].iceGatheringState === "complete") {
                    console.log(`${id}: Ice gathering complete`);
                }
            };

            this.connections[id].oniceconnectionstatechange = (event) => {
                console.log(
                    `${id}: ICE connection state: ${this.connections[id].iceConnectionState}`
                );
            };

            this.connections[id].onsignalingstatechange = (event) => {
                console.log(
                    `${id}: Signaling state: ${this.connections[id].signalingState}`
                );
            };
        }

        return this.connections[id];
    }

    createDataChannel({ id, label }: { id: string; label: string }) {
        console.log(`${id}: Create data channel`);
        this.dataChannels[id] = this.connections[id].createDataChannel(label);
        console.log(`${id}: Data channel created`);

        this.dataChannels[id].onopen = () => {
            this.dataChannels[id].send("Hi you!");
        };

        this.dataChannels[id].onmessage = (event) => {
            const message = event.data;
            console.log(message);
        };

        this.dataChannels[id].onclose = () => {
            console.log("Data channel closed");
        };

        console.log(this.dataChannels, this.dataChannels[id].onopen);
    }

    async addIceCandidates({
        id,
        candidates
    }: {
        id: string;
        candidates: RTCIceCandidateInit[];
    }) {
        for (const candidate of candidates) {
            await this.connections[id].addIceCandidate(candidate);
        }
    }

    getConnection(id: string): RTCPeerConnection | null | undefined {
        return this.connections[id];
    }

    getAllConnections() {
        return this.connections;
    }

    closeConnection(id: string) {
        const peerConnection = this.connections[id];

        if (peerConnection) {
            peerConnection.close();
            delete this.connections[id];
        }
    }

    closeDataChannel(id: string) {
        const channel = this.dataChannels[id];

        if (channel) {
            channel.close();
            delete this.dataChannels[id];
        }
    }

    closeAllConnections() {
        for (const connection in this.connections) {
            this.closeConnection(connection);
        }
    }

    async createAndSetOffer(id: string) {
        try {
            console.log(`${id}: Creating offer`);
            const offer = await this.connections[id].createOffer();
            console.log(`${id}: Offer created`);

            console.log(`${id}: Setting local description`);
            await this.connections[id].setLocalDescription(offer);
            console.log(`${id}: Offer created and set.`);
            return offer;
        } catch (error) {
            console.error(`${id}: Error creating or setting offer:`, error);
            throw error;
        }
    }

    async createAndSetAnswer(id: string): Promise<RTCSessionDescriptionInit> {
        const answer = await this.connections[id].createAnswer();
        await this.connections[id].setLocalDescription(answer);

        return answer;
    }

    //TODO: Handle errors
    async setRemoteDescription({
        id,
        sessionDescription
    }: {
        id: string;
        sessionDescription: string;
    }) {
        await this.connections[id].setRemoteDescription(
            JSON.parse(sessionDescription)
        );
    }

    sendMessage({
        id,
        message
        // eventHandlers: EventHandlers
    }: {
        id: string;
        message: string;
        // eventHandlers: EventHandlers
    }) {
        this.dataChannels[id].send(message);
    }
}
