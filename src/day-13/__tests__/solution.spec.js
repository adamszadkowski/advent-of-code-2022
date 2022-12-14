import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day13Solution } from "../solution";

describe("day 13", () => {
    let solution;

    beforeEach(() => {
        solution = new Day13Solution();
    });

    test("load messages", () => {
        const input = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]
        `.replace(/^\n/, "");
        expect(solution.load(input)).toEqual([
            [1, 1, 3, 1, 1],
            [1, 1, 5, 1, 1],
            [[1], [2, 3, 4]],
            [[1], 4],
        ]);
    });

    [
        {
            first: 0,
            second: 1,
        },
        {
            first: [1],
            second: 2,
        },
        {
            first: [1],
            second: [2],
        },
        {
            first: [1, 1],
            second: [1, 2],
        },
        {
            first: [1, 1, 3, 1, 1],
            second: [1, 1, 5, 1, 1],
        },
        {
            first: [[1], [2, 3, 4]],
            second: [[1], 4],
        },
        {
            first: [[8, 7, 6]],
            second: [9],
        },
        {
            first: [[4, 4], 4, 4],
            second: [[4, 4], 4, 4, 4],
        },
        {
            first: [7, 7, 7],
            second: [7, 7, 7, 7],
        },
        {
            first: [],
            second: [3],
        },
        {
            first: [[]],
            second: [[[]]],
        },
        {
            first: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
            second: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        },
    ].forEach(({ first, second }) => {
        test(`messages ${first} and ${second} are in order`, () => {
            expect(solution.compare(first, second)).toBeTruthy();
            expect(solution.compare(second, first)).toBeFalsy();
        });
    });

    test("count sample messages", () => {
        const input = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`.replace(/^\n/, "");

        expect(solution.countCorrectOrder(input)).toBe(13);
    });

    test("count sorted messages", () => {
        const input = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`.replace(/^\n/, "");

        expect(solution.countSortedOrder(input)).toBe(140);
    });
});
