const { Item } = require("../../models/item");

async function createItem(name, price) {
  const payload = {
    name,
    price,
  };
  const item = await new Item(payload).save();
  return item;
}

module.exports.createItem = createItem;
