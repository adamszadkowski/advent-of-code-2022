import { describe, expect, test } from "@jest/globals";

describe("day 13", () => {

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
            expect(compare(first, second)).toBeTruthy();
            expect(compare(second, first)).toBeFalsy();
        });
    });
});

function compare(first, second) {
    if (!Array.isArray(first) && !Array.isArray(second)) {
        return first < second;
    } else if (Array.isArray(first) && !Array.isArray(second)) {
        return compare(first, [second]);
    } else if (!Array.isArray(first) && Array.isArray(second)) {
        return compare([first], second);
    } else {
        for (let i = 0; i < Math.min(first.length, second.length); i++) {
            if (compare(first[i], second[i])) return true;
            else if (compare(second[i], first[i])) return false;
        }
        return first.length < second.length;
    }
}
