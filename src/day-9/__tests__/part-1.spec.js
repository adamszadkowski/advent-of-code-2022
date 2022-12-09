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

    test("decode moves", () => {
        const input = `U 1
                       D 2
                       L 1
                       R 3`.replace(/\n +/g, "\n");

        expect(solver.decode(input)).toEqual(["U", "D", "D", "L", "R", "R", "R"]);
    });

    test("track head moves", () => {
        const input = `U 1
                       L 1
                       D 1
                       R 1`.replace(/\n +/g, "\n");
        expect(solver.move(input).head).toEqual([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 },
            { x: 0, y: -1 },
            { x: 0, y: 0 },
        ]);
    });

    test("track tail moves", () => {
        const input = `U 2`.replace(/\n +/g, "\n");
        expect(solver.move(input).tail).toEqual([
            { x: 0, y: 0 },
            { x: 1, y: 0 },
        ]);
    });
});
