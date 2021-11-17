const Tuitah = require("../../database/models/tuitah");
const { getTuitah, addTuitah, likeTuitah } = require("./tuitahController");

jest.mock("../../database/models/tuitah");

describe("Given a getTuitah function", () => {
  describe("When it is call", () => {
    test("Then it should invoke res.json() function with a list of Tuits", async () => {
      const tuit = [
        {
          text: "que pazaa pishasssss",
          likes: 0,
          date: "2021-11-17T18:40:31.613Z",
          __v: 0,
          id: "61954c9fc24554beef209bbe",
        },
        {
          text: "oleolehh lo caracoleehh",
          likes: 6,
          date: "2021-11-17T18:40:55.096Z",
          __v: 0,
          id: "61954cb7c24554beef209bc0",
        },
        {
          text: "Estamos probando un poquito como va esto",
          likes: 0,
          date: "2021-11-17T18:47:14.694Z",
          __v: 0,
          id: "61954e67604295c02c6b3095",
        },
      ];

      const res = {
        json: jest.fn(),
      };

      Tuitah.find = jest.fn().mockResolvedValue(tuit);

      await getTuitah(null, res, null);

      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("When it is wrong", () => {
    test("Then it should invoke next() function with error 400 and message Datos erroneos!", async () => {
      const expectedError = {
        code: 400,
        message: "Datos erroneos!",
      };
      Tuitah.find = jest.fn().mockRejectedValue({});

      const next = jest.fn();

      await getTuitah(null, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
    });
  });
});

describe("Given a addTuitah function", () => {
  describe("When it is call with a new Tuit ", () => {
    test("Then it should invoke res.json() function with a message - Creado correctamente!", async () => {
      const req = {
        body: {
          text: "que pazaa pishasssss",
        },
      };

      const tuit = {
        text: "que pazaa pishasssss",
        likes: 0,
        date: "2021-11-17T18:40:31.613Z",
        __v: 0,
        id: "61954c9fc24554beef209bbe",
      };

      const expectedRespons = { tuit: "Creado correctamente!" };

      const res = {
        json: jest.fn(),
      };

      Tuitah.create = jest.fn().mockResolvedValue(tuit);

      await addTuitah(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedRespons);
    });
  });
  describe("When it is wrong request", () => {
    test("Then it should invoke next() function with error 400 and message Datos erroneos!", async () => {
      const expectedError = {
        code: 400,
        message: "Datos erroneos!",
      };
      Tuitah.create = jest.fn().mockRejectedValue({});

      const next = jest.fn();

      await getTuitah(null, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
    });
  });
});

describe("Given a likeTuitah function", () => {
  describe("When it is call with a id Tuit ", () => {
    test("Then it should invoke res.json() function with Tuit liked", async () => {
      const req = {
        body: {
          id: "61954cb7c24554beef209bc0",
        },
      };

      const tuit = {
        text: "que pazaa pishasssss",
        likes: 0,
        date: "2021-11-17T18:40:31.613Z",
        __v: 0,
        id: "61954cb7c24554beef209bc0",
        save: jest.fn(),
      };

      const tuitLiked = {
        text: "que pazaa pishasssss",
        likes: 1,
        date: "2021-11-17T18:40:31.613Z",
        __v: 0,
        id: "61954cb7c24554beef209bc0",
      };

      const res = {
        json: jest.fn(),
      };

      Tuitah.findById = jest.fn().mockResolvedValue(tuit);

      Tuitah.findOne = jest.fn().mockResolvedValue(tuitLiked);

      await likeTuitah(req, res, null);

      expect(res.json).toHaveBeenCalledWith(tuitLiked);
    });
  });
});
