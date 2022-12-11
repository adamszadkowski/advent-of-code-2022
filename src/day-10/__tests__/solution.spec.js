import { describe, beforeEach, test, expect } from "@jest/globals";
import { Day10Solution } from "@/day-10//solution";

describe("day 10", () => {
    let solution;

    beforeEach(() => {
        solution = new Day10Solution();
    });

    test("load data", () => {
        const input = `noop
                       addx 1`.replace(/\n +/g, "\n");
        expect(solution.load(input)).toEqual([
            { command: "noop", x: null },
            { command: "addx", x: 1 },
        ])
    });

    test("cycle noop command", () => {
        const input = `noop`;
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: { command: "noop", x: null }, x: 1 },
        ]);
    });

    test("cycle noop command twice", () => {
        const input = `noop
                       noop`.replace(/\n +/g, "\n");
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: { command: "noop", x: null }, x: 1 },
            { cycle: 2, command: { command: "noop", x: null }, x: 1 },
        ]);
    });

    test("cycle addx command", () => {
        const input = `addx 2`;
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: { command: "addx", x: 2 }, x: 1 },
            { cycle: 2, command: { command: "addx", x: 2 }, x: 1 },
        ]);
    });

    test("cycle sample commands", () => {
        const input = `noop
                       addx 3
                       addx -5
                       noop`.replace(/\n +/g, "\n");
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: { command: "noop", x: null }, x: 1 },
            { cycle: 2, command: { command: "addx", x: 3 }, x: 1 },
            { cycle: 3, command: { command: "addx", x: 3 }, x: 1 },
            { cycle: 4, command: { command: "addx", x: -5 }, x: 4 },
            { cycle: 5, command: { command: "addx", x: -5 }, x: 4 },
            { cycle: 6, command: { command: "noop", x: null }, x: -1 },
        ]);
    });

    test("calculate strength", () => {
        const input = `noop
                       addx 3
                       addx -5
                       noop`.replace(/\n +/g, "\n");
        expect(solution.strengths(input)).toEqual([
            { cycle: 1, x: 1, strength: 1 },
            { cycle: 2, x: 1, strength: 2 },
            { cycle: 3, x: 1, strength: 3 },
            { cycle: 4, x: 4, strength: 16 },
            { cycle: 5, x: 4, strength: 20 },
            { cycle: 6, x: -1, strength: -6 },
        ]);
    });
});
