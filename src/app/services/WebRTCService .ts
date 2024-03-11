export class WebRTCService {
    private connections: Record<string, RTCPeerConnection> = {};
    private dataChannels: Record<string, RTCDataChannel> = {};

    createConnection(id: string) {
        if (!this.connections[id]) {
            console.log(`${id}: Creating connection`);
            this.connections[id] = new RTCPeerConnection();

            this.connections[id].onicecandidate = ({ candidate }) => {
                if (candidate) {
                    console.log("ICE candidate:", candidate);
                } else {
                    console.log("ICE gathering complete");
                }
            };

            this.connections[id].ondatachannel = ({ channel }) => {
                channel.onopen = () => {
                    channel.send("Data channel opened");
                };

                channel.onmessage = (event) => {
                    console.log(event.data);
                };
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

    async waitForIceGatheringComplete(id: string) {
        return new Promise<RTCSessionDescription | null>((resolve) => {
            const checkIceState = () => {
                if (this.connections[id].iceGatheringState === "complete") {
                    console.log(`${id}: Ice gathering complete`);
                    resolve(this.connections[id].localDescription);
                } else {
                    setTimeout(checkIceState, 100);
                }
            };

            checkIceState();
        });
    }

    async createAndSetOffer(id: string) {
        try {
            console.log(`${id}: Creating offer`);
            const offerInit = await this.connections[id].createOffer();

            console.log(`${id}: Setting local description`);
            await this.connections[id].setLocalDescription(offerInit);
            console.log(`${id}: Offer created and set.`);

            console.log(`${id}: Waiting for ICE candidates`);
            const offer = await this.waitForIceGatheringComplete(id);

            return offer;
        } catch (error) {
            console.error(`${id}: Error creating or setting offer:`, error);
            throw error;
        }
    }

    async createAndSetAnswer(id: string) {
        console.log(`${id}: Creating answer`);
        const answerInit = await this.connections[id].createAnswer();

        console.log(`${id}: Setting local description`);
        await this.connections[id].setLocalDescription(answerInit);
        console.log(`${id}: Offer created and set.`);

        console.log(`${id}: Waiting for ICE candidates`);
        const answer = await this.waitForIceGatheringComplete(id);

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

    sendMessage({ id, message }: { id: string; message: string }) {
        this.dataChannels[id].send(message);
    }
}
