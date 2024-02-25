import { faker } from "@faker-js/faker";
import { Response, createServer, Model, Factory } from "miragejs";

export const startFakeServer = () => {
    const server = createServer({
        models: {
            room: Model,
            message: Model
        },

        seeds(server) {
            const roomNames = ["Test Room", "Room Two", "Another"];
            roomNames.forEach((name) => {
                server.create("room", { name });
            });

            for (let i = 0; i < 5; i++) {
                server.create("message", {
                    roomId: 1,
                    text: faker.lorem.sentence(),
                    timestamp: faker.date.recent().toISOString()
                });
            }
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
                const { roomId, name } = JSON.parse(requestBody);

                if (roomId) {
                    return { data: schema.rooms.find(roomId) };
                }

                const room = schema.rooms.create({ name });

                return { data: room };
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
            // this.post(
            //     "/rooms/:roomId/messages",
            //     (schema, { requestBody, params: { roomId } }) => {
            //         const body = JSON.parse(requestBody);

            //         const message = schema.messages.create({ roomId, ...body });

            //         return {
            //             id: message.id,
            //             text: message.text,
            //             username: message.username,
            //             timestamp: message.timestamp
            //         };
            //     }
            // );
            this.post("/rooms/:roomId/messages", () => {
                return new Response(
                    500,
                    {},
                    { message: "name cannot be blank" }
                );
            });
        }
    });

    console.log(server.db);
};
