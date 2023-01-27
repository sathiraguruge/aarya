const mongoose = require("mongoose");
const request = require("supertest");
const { Item } = require("../../models/item");
const { User } = require("../../models/user");
const { createAndLoginCustomer } = require("../util/loginCustomer");

let server;
describe("api/items", () => {
  beforeAll(() => {
    server = require("../../index");
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });
  afterEach(async () => {
    await Item.deleteMany({});
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all items", async () => {
      await Item.insertMany([
        { name: "Google Pixel 7 Pro 12GB RAM 256GB", price: "410755.00" },
        { name: "Google Pixel 7 8GB RAM 256GB", price: "263801.13" },
        { name: "Huawei Nova Y61 6GB RAM 64GB", price: "63572.25" },
      ]);

      const response = await request(server).get("/api/items");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      expect(
        response.body.some(
          (item) => item.name === "Huawei Nova Y61 6GB RAM 64GB"
        )
      ).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    let item;
    beforeEach(async () => {
      item = {
        _id: mongoose.Types.ObjectId(),
        name: "Google Pixel 7 Pro 12GB RAM 256GB",
        price: 410755.22,
      };
      await new Item(item).save();
    });

    it("should return the correct item when id is passed", async () => {
      const response = await request(server).get(`/api/items/${item._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: item.name,
        price: item.price,
      });
    });

    it("should return 404 item when invalid id with valid ObjectId is passed", async () => {
      const response = await request(server).get(
        "/api/items/" + mongoose.Types.ObjectId()
      );
      expect(response.status).toBe(404);
    });

    it("should return 400 item when invalid id with invalid ObjectId is passed", async () => {
      const response = await request(server).get("/api/items/123");

      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid ID");
    });
  });

  describe("POST /", () => {
    let loginResponse;
    beforeEach(async () => {
      loginResponse = await createAndLoginCustomer(server);
    });

    it("should save an item when the payload is valid", async () => {
      const payload = {
        name: "Item 1",
        price: 1234,
        description: "This is a test description",
        tags: ["phone", "electronic", "android"],
      };
      const response = await request(server)
        .post("/api/items/")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(payload);
    });

    it("should return 400 with a error message when the payload is invalid", async () => {
      const payload = {
        price: 1234,
        description: "This is a test description",
        tags: ["phone", "electronic", "android"],
      };
      const response = await request(server)
        .post("/api/items/")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(400);
      expect(response.text).not.toBeNull();
    });
  });

  describe("PUT /:id", () => {
    let loginResponse;
    let itemResponse;
    let updatePayload;
    beforeEach(async () => {
      loginResponse = await createAndLoginCustomer(server);
      itemResponse = await request(server)
        .post("/api/items/")
        .set("x-auth-token", loginResponse.token)
        .send({
          name: "Item 1",
          price: 1234,
          description: "This is a test description",
          tags: ["phone", "electronic", "android"],
        });
      updatePayload = {
        name: "Item 2",
        price: 600,
        description: "This is a test description 2",
        tags: ["Kit", "Lamp", "IoT"],
      };
    });

    it("should update an item when the payload is valid", async () => {
      const response = await request(server)
        .put(`/api/items/${itemResponse.body._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatePayload);
    });

    it("should return 400 when item ID is invalid", async () => {
      const response = await request(server)
        .put(`/api/items/123`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item ID is not found", async () => {
      const response = await request(server)
        .put("/api/items/" + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(404);
    });

    it("should return 400 when the upload payload is invalid", async () => {
      updatePayload = {
        price: 600,
        description: "This is a test description 2",
        tags: ["Kit", "Lamp", "IoT"],
      };
      const response = await request(server)
        .put(`/api/items/${itemResponse.body._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
      expect(response.text).not.toBeNull();
    });
  });

  describe("DELETE /:id", () => {
    let loginResponse;
    let itemResponse;
    beforeEach(async () => {
      loginResponse = await createAndLoginCustomer(server);
      itemResponse = await request(server)
        .post("/api/items/")
        .set("x-auth-token", loginResponse.token)
        .send({
          name: "Item 1",
          price: 1234,
          description: "This is a test description",
          tags: ["phone", "electronic", "android"],
        });
    });

    it("should delete an item when the id is valid", async () => {
      const response = await request(server)
        .delete(`/api/items/${itemResponse.body._id}`)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(200);
    });

    it("should return 400 when item ID is invalid", async () => {
      const response = await request(server)
        .delete(`/api/items/12`)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item is not found", async () => {
      const response = await request(server)
        .delete(`/api/items/` + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(404);
    });
  });
});
