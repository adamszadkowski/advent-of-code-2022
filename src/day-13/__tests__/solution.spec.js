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
            first: [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
            second: [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        },
    ].forEach(({ first, second, isCorrect }) => {
        test(`messages ${first} and ${second} are in order: ${isCorrect}`, () => {
            expect(compare(first, second)).toBeTruthy();
            expect(compare(second, first)).toBeFalsy();
        });
    });
});

function compare(first, second) {
    return first < second;
}
