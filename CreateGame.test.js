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
});

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
  test("should add 10 bonus if the roll after a spare is a strike", () => {
    Game.roll(5);
    Game.roll(5);
    Game.roll(10);
    expect(Game.score).toEqual(30);
  });
  test("should double the score for correct rolls in case of 2 strikes in a row", () => {
    Game.roll(1);
    Game.roll(0);
    Game.roll(10);
    Game.roll(10);
    Game.roll(2);
    Game.roll(4);
    expect(Game.score).toEqual(45);
  });
  test("should have a score of 300 for a perfect game", () => {
    for (let i = 0; i < 12; i++) {
      Game.roll(10);
    }
    expect(Game.score).toEqual(300);
  });
  test("should only add the 11th and 12th roll as bonus points for previous strike", () => {
    for (let i = 0; i < 16; i++) {
      Game.roll(0);
    }
    Game.roll(10);
    Game.roll(10);
    Game.roll(1);
    Game.roll(3);
    expect(Game.score).toEqual(35);
  });
  test("should only add the 11th roll as bonus points for previous spare", () => {
    for (let i = 0; i < 18; i++) {
      Game.roll(0);
    }
    Game.roll(5);
    Game.roll(5);
    Game.roll(1);
    expect(Game.score).toEqual(11);
  });
});

describe("CreateGame: getScore", () => {
  test("should be a method", () => {
    expect(typeof Game.getScore).toEqual("function");
  });
  test("should return the current score", () => {
    Game.roll(2);
    Game.roll(4);
    expect(Game.getScore()).toEqual(6);
  });
});
