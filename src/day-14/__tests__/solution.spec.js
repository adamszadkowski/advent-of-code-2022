import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day14Solution } from "../solution";

describe("day 13", () => {
    let solution;

    beforeEach(() => {
        solution = new Day14Solution();
    });

    test("create map", () => {
        const input = `497,4 -> 504,4
                       497,4 -> 497,2 -> 495,2 -> 495,3`.replace(/\n +/g, "\n");

        const map = solution.load(input);

        expect(map.visualize()).toEqual(
            `.....+....
             ..........
             ###.......
             #.#.......
             ..########`.replace(/ +/g, ""),
        );
    });

    test("count sand units", () => {
        const input = `498,4 -> 498,6 -> 496,6
                       503,4 -> 502,4 -> 502,9 -> 494,9`.replace(/\n +/g, "\n");

        expect(solution.countSandUnits(input)).toBe(24);
    });
});
