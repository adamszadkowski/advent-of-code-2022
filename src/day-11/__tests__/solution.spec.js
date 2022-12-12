import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day11Solution } from "../solution";

describe("day 11", () => {
    let solution;

    describe("part 1", () => {
        beforeEach(() => {
            solution = new Day11Solution(3, 20);
        });

        test("parse input", () => {
            const input = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + old
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0`.replace(/^\n/, "");

            const monkeys = solution.load(input);

            expect(monkeys).toEqual([
                expect.objectContaining({
                    monkeyId: 0,
                    items: [79, 98],
                    divisible: 23,
                }),
                expect.objectContaining({
                    monkeyId: 1,
                    items: [54, 65, 75, 74],
                    divisible: 19,
                }),
            ]);
            expect(monkeys[0].operation(2)).toBe(2 * 19);
            expect(monkeys[0].nextMonkey(23 * 2)).toBe(2);
            expect(monkeys[0].nextMonkey(22)).toBe(3);
            expect(monkeys[1].operation(2)).toBe(2 + 2);
            expect(monkeys[1].nextMonkey(19 * 2)).toBe(2);
            expect(monkeys[1].nextMonkey(20)).toBe(0);
        });

        test("execute sample monkey program", () => {
            const input = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`.replace(/^\n/, "");

            expect(solution.monkeyBusiness(input)).toBe(10605)
        });
    });

    describe("part 2", () => {
        beforeEach(() => {
            solution = new Day11Solution(1, 10000);
        });

        test("execute sample monkey program", () => {
            const input = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`.replace(/^\n/, "");

            expect(solution.monkeyBusiness(input)).toBe(2713310158)
        });
    });
});
