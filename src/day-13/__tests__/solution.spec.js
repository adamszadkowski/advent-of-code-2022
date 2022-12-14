import { describe, expect, test } from "@jest/globals";

describe("day 13", () => {

    [
        {
            first: 0,
            second: 1,
            isCorrect: true,
        },
        {
            first: 1,
            second: 0,
            isCorrect: false,
        },
        {
            first: [1],
            second: 2,
            isCorrect: true,
        },
        {
            first: 2,
            second: [1],
            isCorrect: false,
        },
        {
            first: [1],
            second: [2],
            isCorrect: true,
        },
        {
            first: [2],
            second: [1],
            isCorrect: false,
        },
        {
            first: [1, 1],
            second: [1, 2],
            isCorrect: true,
        },
        {
            first: [1, 2],
            second: [1, 1],
            isCorrect: false,
        },
        {
            first: [],
            second: [3],
            isCorrect: true,
        },
        {
            first: [3],
            second: [],
            isCorrect: false,
        },
    ].forEach(({ first, second, isCorrect }) => {
        test(`messages ${first} and ${second} are in order: ${isCorrect}`, () => {
            expect(compare(first, second)).toBe(isCorrect);
        });
    });
});

function compare(first, second) {
    return first < second;
}
