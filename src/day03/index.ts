import run from "aocrunner";
import _ from "lodash";

interface IGears {
  [key: string]: Set<number>;
}

const directions = [
  { row: -1, col: 0 }, // Up
  { row: 1, col: 0 }, // Down
  { row: 0, col: -1 }, // Left
  { row: 0, col: 1 }, // Right
  { row: -1, col: -1 }, // Diagonal Up-Left
  { row: -1, col: 1 }, // Diagonal Up-Right
  { row: 1, col: -1 }, // Diagonal Down-Left
  { row: 1, col: 1 }, // Diagonal Down-Right
];

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => l.split(""));

const isValidIndex = (array: string[][], row: number, col: number): boolean => {
  return row >= 0 && row < array.length && col >= 0 && col < array[row].length;
};

const isSymbol = (value: string | undefined): boolean => {
  return value !== "." && isNaN(Number(value));
};

const checkNeighbour = (
  array: string[][],
  rowIndex: number,
  colIndex: number,
): boolean => {
  for (const dir of directions) {
    const newRow = rowIndex + dir.row;
    const newCol = colIndex + dir.col;

    if (
      isValidIndex(array, newRow, newCol) &&
      isSymbol(array[newRow][newCol])
    ) {
      return true; // Found a neighbor with a symbol
    }
  }

  return false; // No neighbors with a symbol found
};

const checkForGears = (
  array: string[][],
  rowIndex: number,
  colIndex: number,
) => {
  const results = [];
  for (const dir of directions) {
    const newRow = rowIndex + dir.row;
    const newCol = colIndex + dir.col;

    if (isValidIndex(array, newRow, newCol) && array[newRow][newCol] === "*") {
      results.push([newRow, newCol]);
    }
  }

  return results;
};

function customizer(objValue: any, srcValue: any) {
  if (_.isSet(objValue)) {
    return new Set([...objValue, ...srcValue]);
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return _.reduce(
    input,
    (acc, line, row) => {
      const parts = [...line.join("").matchAll(/(\d+)/g)];

      const validParts = parts
        .filter((part) => {
          if (part.index === undefined) return false;
          const str = part[0];
          const index = part.index;

          for (let i = 0; i < str.length; i++) {
            const iToTest = i + index;

            if (checkNeighbour(input, row, iToTest)) {
              return true;
            }
          }

          return false;
        })
        .map((p) => Number(p[0]));

      return (acc += validParts.reduce((acc, curr) => (acc += curr), 0));
    },
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const gears = _.reduce(
    input,
    (acc, line, row) => {
      const parts = [...line.join("").matchAll(/(\d+)/g)];

      const gears = parts.reduce((acc, part) => {
        if (part.index === undefined) return acc;
        const str = part[0];
        const index = part.index;

        for (let i = 0; i < str.length; i++) {
          const iToTest = i + index;
          const gearLocations = checkForGears(input, row, iToTest);

          gearLocations.forEach(([row, col]) => {
            const k = `${row}-${col}`;
            const el = acc[k];

            if (el) {
              el.add(Number(str));
            } else {
              acc[k] = new Set([Number(str)]);
            }
          });
        }

        return acc;
      }, {} as IGears);

      return _.mergeWith(acc, gears, customizer);
    },
    {} as IGears,
  );

  const validGears = _.filter(gears, (v) => v.size == 2);

  return validGears.reduce((acc, curr) => {
    const ratio = [...curr].reduce((acc, curr) => (acc *= curr), 1);

    return (acc += ratio);
  }, 0);
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
