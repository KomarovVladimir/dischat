import { faker } from "@faker-js/faker";
import { createServer, Model, Factory } from "miragejs";

export const startFakeServer = () => {
    const server = createServer({
        models: {
            room: Model,
            message: Model
        },

        factories: {
            room: Factory.extend({
                name(index) {
                    return `Room ${index}`;
                }
            }),
            message: Factory.extend({
                text() {
                    return faker.lorem.sentence();
                },
                date() {
                    return faker.date.recent().toISOString();
                }
            })
        },

        routes() {
            this.urlPrefix = "http://localhost:5000";
            this.namespace = "/api/v1";

            this.get("/rooms");
            this.post("/rooms", (schema) => {
                const room = schema.rooms.create();

                for (let i = 0; i < 10; i++) {
                    schema.messages.create();
                }

                return room;
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
                    const attrs = JSON.parse(requestBody);

                    return schema.messages.create({
                        ...attrs,
                        roomId,
                        date: new Date().toUTCString()
                    });
                }
            );
        }
    });

    console.log(server.db);
};
