import { findTrees } from "@/day-8/part-2";
import { describe, it, expect } from "@jest/globals";

describe("day 8", () => {
    it("sample data", () => {
        const input = (`30373
                        25512
                        65332
                        33549
                        35390`).replace(/ +/g, "");
        expect(findTrees(input)).toBe(8);
    });
});
