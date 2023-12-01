import run from "aocrunner";

const dict = {
  one: 1,
  two: 2,
  four: 4,
  three: 3,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
} as any;

const reduceSum = (regex: RegExp) => (acc: number, curr: string) => {
  const results = [...curr.matchAll(/\d/gm)];

  const lower = dict[results.at(0)?.[0] || 0];
  const upper = dict[results.at(-1)?.[0] || 0];

  return (acc += Number(`${lower}${upper}`));
};

const parseInput = (rawInput: string) => rawInput.split("\n").filter(Boolean);

function sumCalibrationValues(input: string[]): number {
  let sum = 0;

  for (const line of input) {
    const firstDigit = parseInt(line.charAt(0));
    const lastDigit = parseInt(line.charAt(line.length - 1));

    if (!isNaN(firstDigit) && !isNaN(lastDigit)) {
      const calibrationValue = firstDigit * 10 + lastDigit;
      sum += calibrationValue;
    }
  }

  return sum;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(reduceSum(/\d/gm), 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(
    reduceSum(/\d|one|two|four|three|five|six|seven|eight|nine/gm),
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
