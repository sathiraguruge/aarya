const mongoose = require("mongoose");
const request = require("supertest");
const { Order } = require("../../models/order");
const { User } = require("../../models/user");
const { Item } = require("../../models/item");

const { createUser } = require("../util/createUser");
const { createItem } = require("../util/createItem");

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
    it("should return all orders", async () => {
      const user1 = await createUser(
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
          totalPrice: 3,
        },
      ]);

      const response = await request(server).get("/api/orders");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });

    it("should return all orders belonging to the customer", async () => {
      const user1 = await createUser(
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

      const response = await request(server).get(`/api/orders/${user1._id}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });
});
