const mongoose = require("mongoose");
const request = require("supertest");
const { Order } = require("../../models/order");
const { User } = require("../../models/user");
const { Item } = require("../../models/item");

const { createUser } = require("../util/createUser");
const { createItem } = require("../util/createItem");
const { loginCustomer } = require("../util/loginCustomer");

let server;
describe("api/orders", () => {
  beforeAll(() => {
    server = require("../../index");
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
  });
  afterEach(async () => {
    await Order.deleteMany({});
    await User.deleteMany({});
    await Item.deleteMany({});
  });

  describe("GET /", () => {
    let user1;
    beforeEach(async () => {
      user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      const user2 = await createUser(
        "Andrew",
        "Peterson",
        "andrew1@gmail.com",
        "123456718"
      );
      const item1 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const item2 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB1", "2");
      const item3 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB3", "3");

      await Order.insertMany([
        {
          user: user1._id,
          items: [
            {
              item: item1._id,
            },
          ],
          totalPrice: 1,
        },
        {
          user: user1._id,
          items: [
            {
              item: item2._id,
            },
          ],
          totalPrice: 2,
        },
        {
          user: user2._id,
          items: [
            {
              item: item3._id,
            },
          ],
          totalPrice: 2,
        },
      ]);
    });
    it("should return all orders", async () => {
      const response = await request(server).get("/api/orders");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });

    it("should return all orders belonging to the customer", async () => {
      const response = await request(server).get(`/api/orders/${user1._id}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe("POST /", () => {
    let loginResponse;
    beforeEach(async () => {
      loginResponse = await loginCustomer(server);
    });

    it("should create a new order when payload is valid", async () => {
      const user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      const item1 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const item2 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB1", "2");
      const item3 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB3", "3");

      const payload = {
        user: user1._id,
        items: [
          {
            item: item1._id,
            quantity: 1,
          },
          {
            item: item2._id,
            quantity: 2,
          },
          {
            item: item3._id,
            quantity: 3,
          },
        ],
      };

      const response = await request(server)
        .post("/api/orders")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(payload);
    });
    it("should return 400 when user Id is invalid", async () => {
      const item = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const payload = {
        user: "1121213",
        items: [
          {
            item: item._id,
            quantity: 1,
          },
        ],
      };

      const response = await request(server)
        .post("/api/orders")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(400);
    });
    it("should return 404 when user does not exist", async () => {
      const item = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const payload = {
        user: mongoose.Types.ObjectId(),
        items: [
          {
            item: item._id,
            quantity: 1,
          },
        ],
      };

      const response = await request(server)
        .post("/api/orders")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(404);
    });
    it("should return 404 when an item does not exist", async () => {
      const user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      const item = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const payload = {
        user: user1._id,
        items: [
          {
            item: mongoose.Types.ObjectId(),
            quantity: 1,
          },
        ],
      };

      const response = await request(server)
        .post("/api/orders")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(404);
    });
    it("should return 400 when an item ID is invalid", async () => {
      const user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      const item = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const payload = {
        user: user1._id,
        items: [
          {
            item: 12,
            quantity: 1,
          },
        ],
      };

      const response = await request(server)
        .post("/api/orders")
        .set("x-auth-token", loginResponse.token)
        .send(payload);
      expect(response.status).toBe(400);
    });
  });

  describe("PUT /:id", () => {
    let loginResponse;
    let orderResponse;
    let updatePayload;
    let user1;
    let item1;
    beforeEach(async () => {
      loginResponse = await loginCustomer(server);
      user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      item1 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const item2 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB1", "2");
      const item3 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB3", "3");

      orderResponse = await request(server)
        .post("/api/orders/")
        .set("x-auth-token", loginResponse.token)
        .send({
          user: user1._id,
          items: [
            {
              item: item1._id,
              quantity: 1,
            },
            {
              item: item2._id,
              quantity: 2,
            },
            {
              item: item3._id,
              quantity: 3,
            },
          ],
        });
      updatePayload = {
        user: user1._id,
        items: [
          {
            item: item1._id,
            quantity: 10,
          },
          {
            item: item2._id,
            quantity: 22,
          },
          {
            item: item3._id,
            quantity: 56,
          },
        ],
      };
    });

    it("should update an order when the payload is valid", async () => {
      const response = await request(server)
        .put(`/api/orders/${orderResponse.body._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatePayload);
    });

    it("should return 400 when item ID is invalid", async () => {
      const response = await request(server)
        .put(`/api/orders/123`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item ID is not found", async () => {
      const response = await request(server)
        .put("/api/orders/" + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(404);
    });

    it("should return 400 when the upload payload is invalid", async () => {
      updatePayload = {
        user: user1._id,
        items: [
          {
            item: item1._id,
            quantity: "Hello",
          },
        ],
      };
      const response = await request(server)
        .put(`/api/orders/${orderResponse.body._id}`)
        .set("x-auth-token", loginResponse.token)
        .send(updatePayload);
      expect(response.status).toBe(400);
    });
  });

  describe("DELETE /:id", () => {
    let loginResponse;
    let orderResponse;
    beforeEach(async () => {
      loginResponse = await loginCustomer(server);
      const user1 = await createUser(
        "Andrew",
        "Peterson",
        "andrew@gmail.com",
        "12345678"
      );
      const item1 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB", "1");
      const item2 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB1", "2");
      const item3 = await createItem("Google Pixel 7 Pro 12GB RAM 256GB3", "3");

      orderResponse = await request(server)
        .post("/api/orders/")
        .set("x-auth-token", loginResponse.token)
        .send({
          user: user1._id,
          items: [
            {
              item: item1._id,
              quantity: 1,
            },
            {
              item: item2._id,
              quantity: 2,
            },
            {
              item: item3._id,
              quantity: 3,
            },
          ],
        });
    });

    it("should delete an item when the id is valid", async () => {
      const response = await request(server)
        .delete(`/api/orders/${orderResponse.body._id}`)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(200);
    });

    it("should return 400 when item ID is invalid", async () => {
      const response = await request(server)
        .delete(`/api/orders/12`)
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(400);
    });

    it("should return 404 when item is not found", async () => {
      const response = await request(server)
        .delete(`/api/orders/` + mongoose.Types.ObjectId())
        .set("x-auth-token", loginResponse.token);
      expect(response.status).toBe(404);
    });
  });
});
