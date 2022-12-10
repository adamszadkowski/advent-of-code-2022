import { describe, beforeEach, test, expect } from "@jest/globals";
import { Day9Solution } from "@/day-9/part-1";

describe("day 9", () => {
    let visualizer;

    describe("moves visualisation", () => {
        beforeEach(() => {
            visualizer = new Visualizer({ x: 5, y: 3 }, { x: 2, y: 1 });
        });

        test("empty result", () => {
            expect(visualizer.visualize([])).toEqual(
                `.....
                 .....
                 .....`.replace(/ +/g, ""));
        });

        test("single point", () => {
            const moves = [{ x: 0, y: 0 }];

            expect(visualizer.visualize(moves)).toEqual(
                `.....
                 ..H..
                 .....`.replace(/ +/g, ""));
        });

        test("two points", () => {
            const moves = [{ x: 1, y: 0 }, { x: 2, y: 1 }];

            expect(visualizer.visualize(moves)).toEqual(
                `....T
                 ...H.
                 .....`.replace(/ +/g, ""));
        });
    });

    describe("part 1", () => {
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

        test("hide tail under head", () => {
            const input = `U 1
                       D 2
                       U 1`.replace(/\n +/g, "\n");
            expect(solver.move(input).tail).toEqual([
                { x: 0, y: 0 },
            ]);
        });

        test("move tail on corners", () => {
            const input = `R 1
                       U 2`.replace(/\n +/g, "\n");
            expect(solver.move(input).tail).toEqual([
                { x: 0, y: 0 },
                { x: 1, y: 1 },
            ]);
        });

        test("move tail on corners with get back", () => {
            const input = `R 1
                       U 1
                       L 1`.replace(/\n +/g, "\n");
            expect(solver.move(input).tail).toEqual([
                { x: 0, y: 0 },
            ]);
        });

        test("move tail on two corners", () => {
            const input = `R 1
                       U 1
                       R 1`.replace(/\n +/g, "\n");
            expect(solver.move(input).tail).toEqual([
                { x: 0, y: 0 },
                { x: 1, y: 1 },
            ]);
        });

        test("count distinct moves", () => {
            const input = `R 4
                       U 4
                       L 3
                       D 1
                       R 4
                       D 1
                       L 5
                       R 2`.replace(/\n +/g, "\n");
            expect(solver.countDistinctTailMoves(input)).toEqual(13);
        });
    });
});

class Visualizer {
    constructor(size, center) {
        this.size = size;
        this.center = center;
    }

    visualize(input) {
        const matrix = this.createMatrix();

        input.forEach(({ x, y }, index) => {
            matrix[y + this.center.y][x + this.center.x] = index === 0 ? "H" : "T";
        });

        return matrix
            .reverse()
            .map((r) => r.join(""))
            .join("\n");
    }

    createMatrix() {
        const matrix = [];
        for (let y = 0; y < this.size.y; y++) {
            const row = [];
            for (let x = 0; x < this.size.x; x++) row.push(".");
            matrix.push(row);
        }
        return matrix;
    }
}
