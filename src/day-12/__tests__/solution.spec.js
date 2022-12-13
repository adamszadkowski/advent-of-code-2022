import { beforeEach, describe, expect, test } from "@jest/globals";
import { Day12Solution } from "../solution";

describe("day 12", () => {
    let solution;

    beforeEach(() => {
        solution = new Day12Solution();
    });

    describe("loaded", () => {
        let loaded;

        beforeEach(() => {
            const input = `
gaaae
aSaaa
aaaEa
aaaaa
faaaz`.replace(/\n/, "");
            loaded = solution.load(input);
        });

        [
            { x: 0, y: 0, hill: 'f' },
            { x: 4, y: 0, hill: 'z' },
            { x: 4, y: 4, hill: 'e' },
            { x: 0, y: 4, hill: 'g' },
        ].forEach(({ x, y, hill }) => {
            test(`load hills in (${x}, ${y}) as ${hill}`, () => {
                expect(loaded.hill({ x, y })).toBe(hill.charCodeAt(0) - "a".charCodeAt(0));
            });
        });

        [
            { x: 0, y: 0, exists: true },
            { x: 4, y: 4, exists: true },
            { x: -1, y: 4, exists: false },
            { x: 4, y: -1, exists: false },
            { x: 0, y: 5, exists: false },
            { x: 5, y: 0, exists: false },
        ].forEach(({ x, y, exists }) => {
            test(`hill (${x}, ${y}) exists = ${exists}`, () => {
                expect(loaded.exists({ x, y })).toBe(exists);
            });
        });

        test("find start", () => {
            expect(loaded.getStart()).toEqual({ x: 1, y: 3 });
        });

        test("find end", () => {
            expect(loaded.getEnd()).toEqual({ x: 3, y: 2 });
        });

        test("load start hill", () => {
            expect(loaded.hill(loaded.getStart())).toBe(0);
        });

        test("load end hill", () => {
            expect(loaded.hill(loaded.getEnd())).toBe(25);
        });
    });
});
