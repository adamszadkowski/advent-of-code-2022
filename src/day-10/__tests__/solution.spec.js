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
            { cycle: 1, command: "noop", x: 1 },
        ]);
    });

    test("cycle noop command twice", () => {
        const input = `noop
                       noop`.replace(/\n +/g, "\n");
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: "noop", x: 1 },
            { cycle: 2, command: "noop", x: 1 },
        ]);
    });

    test("cycle addx command", () => {
        const input = `addx 2`;
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: "addx", x: 1 },
            { cycle: 2, command: "addx", x: 1 },
        ]);
    });

    test("cycle sample commands", () => {
        const input = `noop
                       addx 3
                       addx -5
                       noop`.replace(/\n +/g, "\n");
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: "noop", x: 1 },
            { cycle: 2, command: "addx", x: 1 },
            { cycle: 3, command: "addx", x: 1 },
            { cycle: 4, command: "addx", x: 4 },
            { cycle: 5, command: "addx", x: 4 },
            { cycle: 6, command: "noop", x: -1 },
        ]);
    });
});
