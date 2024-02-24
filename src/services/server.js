import { faker } from "@faker-js/faker";
import { createServer, Model, Factory } from "miragejs";

export const startFakeServer = () => {
    const server = createServer({
        models: {
            room: Model,
            message: Model
        },

        seeds(server) {
            server.create("room", { name: "Test Room" });
            server.create("room", { name: "Room Two" });
            server.create("room", { name: "Another" });
        },

        factories: {
            room: Factory.extend({
                name(i) {
                    return `Room ${i}`;
                }
            }),
            message: Factory.extend({
                text() {
                    return faker.lorem.sentence();
                },
                timestamp() {
                    return faker.date.recent().toISOString();
                }
            })
        },

        routes() {
            this.urlPrefix = "http://localhost:5000";
            this.namespace = "/api/v1";

            this.get("/rooms");
            this.post("/rooms", (schema, { requestBody }) => {
                const body = JSON.parse(requestBody);
                const room = schema.rooms.create(body);

                for (let i = 0; i < 10; i++) {
                    schema.messages.create();
                }

                return {
                    id: room.id,
                    name: room.name
                };
            });

            this.get("/rooms/:roomId", (schema, { params: { roomId } }) => {
                return schema.rooms.find(roomId);
            });
            this.delete("/rooms/:roomId");

            this.get(
                "/rooms/:roomId/messages",
                (schema, { params: { roomId } }) => {
                    return schema.messages.where({ roomId });
                }
            );
            this.post(
                "/rooms/:roomId/messages",
                (schema, { requestBody, params: { roomId } }) => {
                    const body = JSON.parse(requestBody);

                    const message = schema.messages.create({ roomId, ...body });

                    return {
                        id: message.id,
                        text: message.text,
                        username: message.username,
                        timestamp: message.timestamp
                    };
                }
            );
            this.post(
                "/rooms/:roomId/join",
                (schema, { params: { roomId } }) => {
                    return { data: schema.rooms.find(roomId) };
                }
            );
        }
    });

    console.log(server.db);
};
