import run from "aocrunner";
import _ from "lodash";

interface IRules {
  [key: string]: number;
}

interface IGames {
  [key: string]: string[][];
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").reduce((acc, line) => {
    const [idPart, gamePart] = line.split(":");
    const id = idPart.match(/\d+$/m)?.[0];

    if (id) {
      const sets = gamePart.split(";");
      const games = sets.map((s) => s.split(",").map((v) => v.trim()));

      acc[id] = games;
    }
    return acc;
  }, {} as IGames);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const rules = { red: 12, green: 13, blue: 14 } as IRules;

  return _.reduce(
    input,
    (acc, games, key) => {
      const id = Number(key);

      const isInvalid = _.some(games, (game) => {
        return _.some(game, (el) => {
          const [n, color] = el.split(" ");

          return rules[color] < Number(n);
        });
      });

      if (!isInvalid) {
        acc += id;
      }

      return acc;
    },
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const games = _.values(input);

  return _.reduce(
    games,
    (acc, game) => {
      const minSet = _.reduce(
        game,
        (prev, set) => {
          set.forEach((pair) => {
            const [n, color] = pair.split(" ");
            prev[color] = Math.max(prev[color], Number(n));
          });

          return prev;
        },
        { red: 0, green: 0, blue: 0 } as IRules,
      );

      const power = _.reduce(_.values(minSet), (acc, curr) => (acc *= curr), 1);

      return (acc += power);
    },

    0,
  );
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
