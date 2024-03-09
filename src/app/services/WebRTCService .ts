export class WebRTCService {
    private connections: Record<string, RTCPeerConnection> = {};

    createConnection(id: string) {
        if (!this.connections[id]) {
            this.connections[id] = new RTCPeerConnection();
        }

        return this.connections[id];
    }

    getConnection(id: string): RTCPeerConnection | null | undefined {
        return this.connections[id];
    }

    getAllConnections() {
        return this.connections;
    }

    closeConnection(id: string) {
        const pc = this.connections[id];

        if (pc) {
            pc.close();
            delete this.connections[id];
        }
    }

    closeAllConnections() {
        for (const connection in this.connections) {
            this.closeConnection(connection);
        }
    }

    async createAndSetOffer(id: string) {
        const offer = await this.connections[id].createOffer();
        await this.connections[id].setLocalDescription(offer);

        console.log(this.connections[id]);

        return offer;
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
}
