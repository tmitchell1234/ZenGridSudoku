const { boardIsValid } = require("./functions");

for (let i = 1; i <= 50; i++) {
  test("Sudoku board configruation is valid for easy", async () => {
    expect.assertions(1);
    expect(await boardIsValid(i, "easy")).toBe(true);
  });
}
for (let i = 1; i <= 50; i++) {
  test("Sudoku board configruation is valid for medium", async () => {
    expect.assertions(1);
    expect(await boardIsValid(i, "medium")).toBe(true);
  });
}
for (let i = 1; i <= 50; i++) {
  test("Sudoku board configruation is valid for hard", async () => {
    expect.assertions(1);
    expect(await boardIsValid(i, "hard")).toBe(true);
  });
}
