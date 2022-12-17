import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day15Solution } from "../solution";

describe("day 15", () => {
    let solution;

    beforeEach(() => {
        solution = new Day15Solution();
    });

    test("create map", () => {
        const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
                       Sensor at x=9, y=16: closest beacon is at x=10, y=16`.replace(/\n +/g, "\n");

        const map = solution.load(input);

        expect(map.visualize()).toEqual(
            `B########..#.
             ###########SB
             ############.
             ####S#######.`.replace(/ +/g, "")
        );
    });
});
