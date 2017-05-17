const CreateGame = require("./CreateGame");

let Game;
beforeEach(() => {
  Game = CreateGame();
});

describe("CreateGame", () => {
  test("should return an object", () => {
    expect(typeof Game).toEqual("object");
  });

  test("should have a default score of 0", () => {
    expect(Game.score).toEqual(0);
  });
})

describe("CreateGame: roll", () => {
  test("should be a method", () => {
    expect(typeof Game.roll).toEqual("function");
  });

  test("should increment score by given param", () => {
    Game.roll(3);
    expect(Game.score).toEqual(3);
  });

  test("should double the next roll score after a spare", () => {
    Game.roll(4);
    Game.roll(6);
    Game.roll(2);
    expect(Game.score).toEqual(14);
  });

  test("should double only the next roll in case of a spare", () => {
    Game.roll(3);
    Game.roll(7);
    Game.roll(4);
    Game.roll(3);
    Game.roll(2);
    expect(Game.score).toEqual(23);
  });
  test("should double even if 2 spares in a row", () => {
    Game.roll(3);
    Game.roll(7);
    Game.roll(4);
    Game.roll(6);
    Game.roll(2);
    expect(Game.score).toEqual(28);
  });
  test("should double the next 2 rounds in case of a strike", () => {
    Game.roll(10);
    Game.roll(4);
    Game.roll(3);
    expect(Game.score).toEqual(24);
  });
});

