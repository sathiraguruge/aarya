const mongoose = require("mongoose");
const request = require("supertest");
const { Item } = require("../../models/item");

let server;
describe("api/items", () => {
  beforeAll(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Item.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await server.close();
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
      const id = mongoose.Types.ObjectId();
      const response = await request(server).get(`/api/items/${id}`);

      expect(response.status).toBe(404);
    });

    it("should return 400 item when invalid id with invalid ObjectId is passed", async () => {
      const response = await request(server).get("/api/items/123");

      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid ID");
    });
  });
});
