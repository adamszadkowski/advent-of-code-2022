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
            first: [],
            second: [3],
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
