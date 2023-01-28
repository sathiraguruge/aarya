const { User } = require("../models/user");

module.exports = {
  async up(db, client) {
    await createUsers(db);
    await createItems(db);
    await createOrders(db);
  },

  async down(db, client) {
    await dropOrders(db);
    await dropUsers(db);
    await dropItems(db);
  },
};

// Migrating Users
async function createUsers(db) {
  await db.collection("users").insertMany([
    {
      firstname: "Romeo",
      lastname: "Barnett",
      phone: "0714425321",
      address: "3285 Elkview Drive Roswell",
      zipcode: "30075",
      email: "rbarne98@gmail.com",
      password: await User.hashPassword("12345678"),
    },
  ]);
}
async function dropUsers(db) {
  await db.collection("users").deleteMany({
    email: {
      $in: ["rbarne98@gmail.com"],
    },
  });
}

//Migrating Items
async function createItems(db) {
  await db.collection("items").insertMany([
    {
      name: "Samsung Galaxy Buds2 Pro",
      price: "70286.00",
      description:
        "24bit Hi-Fi sound for quality listening experience. ANC with 3 high SNR microphones eliminate more exterior noise. Ergonomic design for comfort fit.360 audio surrounds you like you’re there. 6 Months Warranty",
      image: "",
      tags: ["Samsung", "Galaxy", "Earbuds"],
    },
    {
      name: "Samsung Galaxy Note20 Ultra 5G",
      price: "428570.00",
      description:
        "1440 x 3088 pixels 6.9 inches Dynamic AMOLED 2X capacitive touchscreen 108 MP, f/1.8, 26mm (wide), 12 MP, f/3.0, 103mm (periscope telephoto), 12 MP, f/2.2, 13mm (ultrawide) Cameras. Exynos 990 (7 nm+) – Qualcomm SM8250 Snapdragon 865+ (7 nm+). Bluetooth 5.0, A2DP, LE, aptX. Non-removable Li-Ion 4500 mAh battery with 25W Fast charging",
      image: "",
      tags: ["Samsung", "Galaxy", "Ultra", "Mobile"],
    },
    {
      name: "Samsung Galaxy Watch 4 LTE 40mm",
      price: "81807.00",
      description:
        "All the data your heart desires. Sleek, seamless, iconic. A new day. A new watch face. 6 Months Warranty",
      image: "",
      tags: ["Samsung", "Galaxy", "Watch"],
    },
  ]);
}
async function dropItems(db) {
  await db.collection("items").deleteMany({
    name: {
      $in: [
        "Samsung Galaxy Buds2 Pro",
        "Samsung Galaxy Note20 Ultra 5G",
        "Samsung Galaxy Watch 4 LTE 40mm",
      ],
    },
  });
}

//Migrating Orders
async function createOrders(db) {
  const user = await db
    .collection("users")
    .findOne({ email: "rbarne98@gmail.com" });
  const itemId1 = await db
    .collection("items")
    .findOne({ name: "Samsung Galaxy Buds2 Pro" });

  const itemId2 = await db
    .collection("items")
    .findOne({ name: "Samsung Galaxy Note20 Ultra 5G" });

  await db.collection("orders").insertMany([
    {
      user: user._id,
      items: [
        {
          item: itemId1._id,
          quantity: 2,
        },
        {
          item: itemId2._id,
          quantity: 1,
        },
      ],
      orderDate: Date.now(),
      status: "Pending",
      totalPrice: 569142,
    },
  ]);
}
async function dropOrders(db) {
  const user = await db
    .collection("users")
    .findOne({ email: "rbarne98@gmail.com" });

  await db.collection("orders").deleteMany({
    user: {
      $in: [user._id],
    },
  });
}
