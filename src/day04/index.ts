import run from "aocrunner";

const TEST_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    return line
      .split(": ")[1]
      .split(" | ")
      .map((value) =>
        value.replaceAll("  ", " ").trim().split(" ").map(Number),
      );
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, game, i) => {
    const [winnings, numbers] = game;

    const totalWins = numbers.reduce((wins, n) => {
      if (winnings.includes(n)) wins.push(n);

      return wins;
    }, [] as number[]);

    const value = totalWins.reduce((points, _, i) => {
      if (i == 0) return (points += 1);

      return (points *= 2);
    }, 0);

    return (acc += value);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const results = input.reduce((results, game, gameIndex) => {
    const [winnings, numbers] = game;
    const totalWins = numbers.reduce(
      (wins, n) => (wins += winnings.includes(n) ? 1 : 0),
      0,
    );

    for (let i = 1; i <= totalWins; i++) {
      const el = gameIndex + i;

      for (let j = 0; j < results[gameIndex]; j++) {
        results[el]++;
      }
    }

    return results;
  }, Array(input.length).fill(1));

  return results.reduce((acc, curr) => (acc += curr), 0);
};

run({
  part1: {
    tests: [
      {
        input: TEST_INPUT,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: TEST_INPUT,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
