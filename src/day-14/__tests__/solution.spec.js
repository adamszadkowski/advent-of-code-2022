import { describe, expect, test } from "@jest/globals";

describe("day 13", () => {
    test("create map", () => {
        const map = createMap();

        map.addWall({ x: 497, y: 4 }, { x: 504, y: 4 });
        map.addWall({ x: 497, y: 4 }, { x: 497, y: 2 });
        map.addWall({ x: 497, y: 2 }, { x: 495, y: 2 });
        map.addWall({ x: 495, y: 2 }, { x: 495, y: 3 });

        expect(map.visualize()).toEqual(
            `.....+....
             ..........
             ###.......
             #.#.......
             ..########`.replace(/ +/g, ""),
        );
    });
});

function createMap() {
    const map = [];
    const minY = 0
    let maxY = 0;
    let minX = 500;
    let maxX = 500;

    return {
        addWall(a, b) {
            minX = Math.min(minX, a.x, b.x);
            maxX = Math.max(maxX, a.x, b.x);
            maxY = Math.max(maxY, a.y, b.y);

            if (a.x !== b.x) {
                for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
                    this.set(x, a.y, "#");
                }
            } else if (a.y != b.y) {
                for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
                    this.set(a.x, y, "#");
                }
            }
        },
        visualize() {
            this.set(500, 0, "+");
            let result = ""
            for (let y = minY; y <= maxY; y++) {
                let row = "";
                for (let x = minX; x <= maxX; x++) {
                    row += map[y]?.[x] || ".";
                }
                result += row + (y != maxY ? "\n" : "");
            }
            return result;
        },
        set(x, y, s) {
            (map[y] || (map[y] = []))[x] = s;
        }
    };
}
