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
});
