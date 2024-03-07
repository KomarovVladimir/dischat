import { EntityId } from "@reduxjs/toolkit";

export class WebRTCService {
    private connections: Record<EntityId, RTCPeerConnection> = {};

    createConnection(roomId: EntityId) {
        if (!this.connections[roomId]) {
            this.connections[roomId] = new RTCPeerConnection();
        }

        return this.connections[roomId];
    }

    getConnection(roomId: EntityId): RTCPeerConnection | null | undefined {
        return this.connections[roomId];
    }

    getAllConnections() {
        return this.connections;
    }

    closeConnection(roomId: EntityId) {
        const pc = this.connections[roomId];

        if (pc) {
            pc.close();
            delete this.connections[roomId];
        }
    }

    async createAndSetOffer(roomId: EntityId) {
        const offer = await this.connections[roomId].createOffer();
        await this.connections[roomId].setLocalDescription(offer);

        return offer;
    }

    setRemoteDescription({
        roomId,
        remoteDescription
    }: {
        roomId: EntityId;
        remoteDescription: RTCSessionDescriptionInit;
    }) {
        this.connections[roomId].setRemoteDescription(remoteDescription);
    }
}
