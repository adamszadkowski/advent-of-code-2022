import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day15Solution } from "../solution";

describe("day 15", () => {
    let solution;

    beforeEach(() => {
        solution = new Day15Solution(10, 20);
    });

    test("count positions that cannot contain beacon", () => {
        const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
                       Sensor at x=9, y=16: closest beacon is at x=10, y=16
                       Sensor at x=13, y=2: closest beacon is at x=15, y=3
                       Sensor at x=12, y=14: closest beacon is at x=10, y=16
                       Sensor at x=10, y=20: closest beacon is at x=10, y=16
                       Sensor at x=14, y=17: closest beacon is at x=10, y=16
                       Sensor at x=8, y=7: closest beacon is at x=2, y=10
                       Sensor at x=2, y=0: closest beacon is at x=2, y=10
                       Sensor at x=0, y=11: closest beacon is at x=2, y=10
                       Sensor at x=20, y=14: closest beacon is at x=25, y=17
                       Sensor at x=17, y=20: closest beacon is at x=21, y=22
                       Sensor at x=16, y=7: closest beacon is at x=15, y=3
                       Sensor at x=14, y=3: closest beacon is at x=15, y=3
                       Sensor at x=20, y=1: closest beacon is at x=15, y=3
                       `.replace(/\n +/g, "\n");

        expect(solution.countNotBeacon(input)).toBe(26);
    });

    [
        { before: ["0:1"], after: ["0:1"] },
        { before: ["0:1", "1:2"], after: ["0:2"] },
        { before: ["0:3", "1:2"], after: ["0:3"] },
        { before: ["0:1", "3:4"], after: ["0:1", "3:4"] },
        { before: ["0:1", "2:3", "3:4"], after: ["0:1", "2:4"] },
        { before: ["0:1", "3:5", "5:6"], after: ["0:1", "3:6"] },
        { before: ["0:1", "3:4", "5:6"], after: ["0:1", "3:4", "5:6"] },
        { before: ["2:3", "0:2"], after: ["0:3"] },
        { before: ["0:2", "-1:5"], after: ["-1:5"] },
    ].forEach(({ before, after }) => {
        test(`join ranges ${before} to ${after}`, () => {
            const range = (r) => {
                const [from, to] = r.split(":");
                return { rangeFrom: Number(from), rangeTo: Number(to) };
            }
            const ranges = before.map(r => range(r));

            expect(solution.mergeRanges(ranges)).toEqual(after.map(r => range(r)));
        });
    });

    describe("part 2", () => {
        test("traverse outside points", () => {
            const border = solution.generateBorder({ x: 10, y: 10, distance: 2 });

            expect(Array.from(border).map(({ x, y }) => ({ x, y }))).toMatchObject(
                expect.arrayContaining([
                    { x: 10, y: 7 },
                    { x: 11, y: 8 },
                    { x: 12, y: 9 },
                    { x: 13, y: 10 },
                    { x: 12, y: 11 },
                    { x: 11, y: 12 },
                    { x: 10, y: 13 },
                    { x: 9, y: 12 },
                    { x: 8, y: 11 },
                    { x: 7, y: 10 },
                    { x: 8, y: 9 },
                    { x: 9, y: 8 },
                    { x: 10, y: 7 },
                ])
            )
        });

        test("find tuning frequency of nearby beacon", () => {
            const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
                           Sensor at x=9, y=16: closest beacon is at x=10, y=16
                           Sensor at x=13, y=2: closest beacon is at x=15, y=3
                           Sensor at x=12, y=14: closest beacon is at x=10, y=16
                           Sensor at x=10, y=20: closest beacon is at x=10, y=16
                           Sensor at x=14, y=17: closest beacon is at x=10, y=16
                           Sensor at x=8, y=7: closest beacon is at x=2, y=10
                           Sensor at x=2, y=0: closest beacon is at x=2, y=10
                           Sensor at x=0, y=11: closest beacon is at x=2, y=10
                           Sensor at x=20, y=14: closest beacon is at x=25, y=17
                           Sensor at x=17, y=20: closest beacon is at x=21, y=22
                           Sensor at x=16, y=7: closest beacon is at x=15, y=3
                           Sensor at x=14, y=3: closest beacon is at x=15, y=3
                           Sensor at x=20, y=1: closest beacon is at x=15, y=3
                           `.replace(/\n +/g, "\n");

            expect(solution.findNearbyBeaconTuningFrequency(input)).toBe(56000011);
        });
    });
});
