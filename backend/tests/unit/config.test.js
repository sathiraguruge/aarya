const lib = require("../../startup/config");
const config = require("config");

describe("config", () => {
  it("should throw an exception when jwtPrivateKey is not defined", () => {
    config.get = jest.fn().mockReturnValue(null);

    expect(() => {
      lib();
    }).toThrow();
  });

  it("should throw an exception when db.url is not defined", () => {
    const db = {
      url: "",
      name: "a",
    };

    config.get = jest
      .fn()
      .mockImplementationOnce(() => "a")
      .mockImplementationOnce(() => db);

    expect(() => {
      lib();
    }).toThrow();
  });

  it("should throw an exception when db.name is not defined", () => {
    const db = {
      url: "a",
      name: "",
    };

    config.get = jest
      .fn()
      .mockImplementationOnce(() => "a")
      .mockImplementationOnce(() => db);

    expect(() => {
      lib();
    }).toThrow();
  });
});
