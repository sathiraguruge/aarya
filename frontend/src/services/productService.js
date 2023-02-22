import httpService from "./httpService";

async function getItems() {
  const items = await httpService.get("items");
  return items.data;
}

export default { getItems };
