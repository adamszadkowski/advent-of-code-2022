import { findTrees } from "@/day-8/part-1";
import { describe, it, expect } from "@jest/core";

describe("day 8", () => {
    it("epmty has 0 trees visible", () => {
        expect(findTrees("")).toBe(0);
    });

    it("counts single tree", () => {
        expect(findTrees("2")).toBe(1);
    });

    it("counts all trees in single row", () => {
        expect(findTrees("22472")).toBe(5);
    });

    it("counts all trees in single column", () => {
        const input = (`2
                        4
                        3
                        4
                        5`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(5);
    });

    it("single invisible tree", () => {
        const input = (`222
                        222
                        222`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(8);
    });

    it("single tree is visible from left", () => {
        const input = (`232
                        233
                        232`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(9);
    });

    it("single tree is visible from right", () => {
        const input = (`232
                        332
                        232`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(9);
    });

    it("single tree is invisible from right multiple times", () => {
        const input = (`2322
                        3413
                        2322`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(11);
    });

    it("single tree is invisible from right multiple times", () => {
        const input = (`2322
                        3143
                        2322`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(11);
    });

    it("two trees are invisible from all sides", () => {
        const input = (`3333
                        3113
                        3333`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(10);
    });

    it("two invisible trees", () => {
        const input = (`3333
                        3333
                        3333`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(10);
    });

    it("row integration", () => {
        const input = (`999999999999999999
                        021324354657687980
                        999999999999999999`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(18 * 2 + 2 + 9);
    });

    it("column integration", () => {
        const input = (`909
                        929
                        919
                        939
                        929
                        949
                        939
                        959
                        949
                        969
                        959
                        979
                        969
                        989
                        979
                        999
                        989
                        909`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(18 * 2 + 2 + 9);
    });

    it("sample data", () => {
        const input = (`30373
                        25512
                        65332
                        33549
                        35390`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(21);
    });
});
