import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day11Solution } from "../solution";

describe("day 11", () => {
    let solution;

    beforeEach(() => {
        solution = new Day11Solution();
    });

    test("parse input", () => {
        const input = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`.replace(/^\n/, "");

        const monkeys = solution.load(input);

        expect(monkeys).toEqual([
            expect.objectContaining({
                monkeyId: 0,
                items: [79, 98],
            }),
        ]);
        expect(monkeys[0].operation(2)).toBe(2 * 19);
        expect(monkeys[0].nextMonkey(23 * 2)).toBe(2);
        expect(monkeys[0].nextMonkey(22)).toBe(3);
    });
});
