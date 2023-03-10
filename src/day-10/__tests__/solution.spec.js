import { Day10Solution } from "@/day-10//solution";
import { beforeEach, describe, expect, test } from "@jest/globals";

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

    test("cycle sample commands", () => {
        const input = `noop
                       addx 3
                       addx -5
                       noop`.replace(/\n +/g, "\n");
        expect(solution.cycle(input)).toEqual([
            { cycle: 1, command: { command: "noop", x: null }, x: 1, crtOn: true },
            { cycle: 2, command: { command: "addx", x: 3 }, x: 1, crtOn: true },
            { cycle: 3, command: { command: "addx", x: 3 }, x: 1, crtOn: true },
            { cycle: 4, command: { command: "addx", x: -5 }, x: 4, crtOn: true },
            { cycle: 5, command: { command: "addx", x: -5 }, x: 4, crtOn: true },
            { cycle: 6, command: { command: "noop", x: null }, x: -1, crtOn: false },
        ]);
    });

    test("draw pixels", () => {
        const input = `noop
                       addx 3
                       addx -5
                       noop`.replace(/\n +/g, "\n");
        expect(solution.draw(input)).toEqual(
            `#####.`
        );
    });

    test("calculate sum of strengths", () => {
        const input = `addx 15
                       addx -11
                       addx 6
                       addx -3
                       addx 5
                       addx -1
                       addx -8
                       addx 13
                       addx 4
                       noop
                       addx -1
                       addx 5
                       addx -1
                       addx 5
                       addx -1
                       addx 5
                       addx -1
                       addx 5
                       addx -1
                       addx -35
                       addx 1
                       addx 24
                       addx -19
                       addx 1
                       addx 16
                       addx -11
                       noop
                       noop
                       addx 21
                       addx -15
                       noop
                       noop
                       addx -3
                       addx 9
                       addx 1
                       addx -3
                       addx 8
                       addx 1
                       addx 5
                       noop
                       noop
                       noop
                       noop
                       noop
                       addx -36
                       noop
                       addx 1
                       addx 7
                       noop
                       noop
                       noop
                       addx 2
                       addx 6
                       noop
                       noop
                       noop
                       noop
                       noop
                       addx 1
                       noop
                       noop
                       addx 7
                       addx 1
                       noop
                       addx -13
                       addx 13
                       addx 7
                       noop
                       addx 1
                       addx -33
                       noop
                       noop
                       noop
                       addx 2
                       noop
                       noop
                       noop
                       addx 8
                       noop
                       addx -1
                       addx 2
                       addx 1
                       noop
                       addx 17
                       addx -9
                       addx 1
                       addx 1
                       addx -3
                       addx 11
                       noop
                       noop
                       addx 1
                       noop
                       addx 1
                       noop
                       noop
                       addx -13
                       addx -19
                       addx 1
                       addx 3
                       addx 26
                       addx -30
                       addx 12
                       addx -1
                       addx 3
                       addx 1
                       noop
                       noop
                       noop
                       addx -9
                       addx 18
                       addx 1
                       addx 2
                       noop
                       noop
                       addx 9
                       noop
                       noop
                       noop
                       addx -1
                       addx 2
                       addx -37
                       addx 1
                       addx 3
                       noop
                       addx 15
                       addx -21
                       addx 22
                       addx -6
                       addx 1
                       noop
                       addx 2
                       addx 1
                       noop
                       addx -10
                       noop
                       noop
                       addx 20
                       addx 1
                       addx 2
                       addx 2
                       addx -6
                       addx -11
                       noop
                       noop
                       noop`.replace(/\n +/g, "\n");
        expect(solution.sumOfStrengths(input)).toEqual(13140);
        expect(solution.draw(input)).toEqual(
            `##..##..##..##..##..##..##..##..##..##..
             ###...###...###...###...###...###...###.
             ####....####....####....####....####....
             #####.....#####.....#####.....#####.....
             ######......######......######......####
             #######.......#######.......#######.....
             `.replace(/ +/g, "")
        );
    });
});
