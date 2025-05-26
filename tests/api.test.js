const request = require("supertest");
const app = require("../app");

describe("API Endpoint", () => {
    // Health check
    describe("GET /health-check", () => {
        it("should return a status code 200", async () => {
            const response = await request(app).get("/health-check");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 200,
                message: "The server is UP"
            });
        });
    });

    describe("GET /users", () => {
        it("should return status code 200 and the list of users", async () => {
            const response = await request(app).get("/users");
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 200,
                data: [
                    { id: 1, name: "QcTrung" },
                    { id: 2, name: "Trung" }
                ]
            });
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user with valid input', async () => {
            const response = await request(app)
                .post('/users')
                .send({ name: 'Alice' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                status: 201,
                data: { id: 3, name: 'Alice' }
            });
        });

        it('should return 400 if name is missing', async () => {
            const response = await request(app)
                .post('/users')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                status: 400,
                message: "Name is required"
            });
        });
    });
});