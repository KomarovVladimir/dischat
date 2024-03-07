export class WebRTCService {
    private connections: Record<string, RTCPeerConnection> = {};

    createConnection(roomId: string) {
        if (!this.connections[roomId]) {
            this.connections[roomId] = new RTCPeerConnection();
        }

        return this.connections[roomId];
    }

    public getConnection(roomId: string): RTCPeerConnection | undefined {
        return this.connections[roomId];
    }

    public getAllConnections() {
        return this.connections;
    }

    public closeConnection(roomId: string) {
        const pc = this.connections[roomId];
        if (pc) {
            pc.close();
            delete this.connections[roomId];
        }
    }
}
