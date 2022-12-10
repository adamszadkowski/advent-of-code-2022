import { beforeEach, describe, expect, test } from "@jest/globals";
import { Visualizer } from "@/day-9/visualizer";

describe("moves visualisation", () => {
    let visualizer;

    beforeEach(() => {
        visualizer = new Visualizer({ x: 5, y: 3 }, { x: 2, y: 1 });
    });

    test("empty result", () => {
        expect(visualizer.visualize([])).toEqual(
            `.....
             ..s..
             .....`.replace(/ +/g, ""));
    });

    test("single point", () => {
        const moves = [{ x: 0, y: 0 }];

        expect(visualizer.visualize(moves)).toEqual(
            `.....
             ..H..
             .....`.replace(/ +/g, ""));
    });

    test("two points", () => {
        const moves = [{ x: 1, y: 0 }, { x: 2, y: 1 }];

        expect(visualizer.visualize(moves)).toEqual(
            `....T
             ..sH.
             .....`.replace(/ +/g, ""));
    });

    test("four points", () => {
        const moves = [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }];

        expect(visualizer.visualize(moves)).toEqual(
            `...2T
             ..s1.
             ...H.`.replace(/ +/g, ""));
    });

    test("put head tags on top", () => {
        const moves = [{ x: 1, y: -1 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: -1 }, { x: 0, y: -1 }];

        expect(visualizer.visualize(moves)).toEqual(
            `.....
             ..s..
             ..2H.`.replace(/ +/g, ""));
    });
});
