const app = require("../server");

const request = require("supertest");
const { boardIsValid } = require("./functions");

const url = `/api/getpuzzle_hard`;

let test_array = [];
for (let i = 1; i <= 50; i++) {
  {
    test_array.push({
      number: i,
    });
  }
}

describe("Test hard puzzle number API", () => {
  test.each(test_array)("responds with json", async ({ number, expected }) => {
    const res = await request(app).post(url).send({ puzzle_number: number });

    expect(boardIsValid(JSON.parse(res.text).puzzlestring)).toBe(true);
  });
});
