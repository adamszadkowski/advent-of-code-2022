import { describe, beforeEach, test, expect } from "@jest/globals";
import { Day9Solution } from "@/day-9/part-1";

describe("day 9", () => {
    let solver;

    beforeEach(() => {
        solver = new Day9Solution();
    });

    [
        { input: "U 1", result: ["U"] },
        { input: "L 1", result: ["L"] },
        { input: "D 1", result: ["D"] },
        { input: "R 1", result: ["R"] },
        { input: "U 3", result: ["U", "U", "U"] },
    ].forEach(({ input, result }) => {
        test(`decode move ${input}`, () => {
            expect(solver.decode(input)).toEqual(result);
        });
    });
});
