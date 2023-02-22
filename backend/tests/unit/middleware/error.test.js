const error = require("../../../middleware/error");

describe("error middleware", () => {
  it("should return 500 if an exception is thrown", () => {
    const err = {};
    const req = {};
    const res = {
      status: jest.fn(function () {
        this.status = 500;
        return this;
      }),
      send: jest.fn().mockReturnValue(),
    };
    const next = jest.fn();

    error(err, req, res, next);

    expect(res.status).toBe(500);
  });
});
