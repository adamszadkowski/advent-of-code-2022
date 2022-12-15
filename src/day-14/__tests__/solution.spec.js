import { describe, expect, test } from "@jest/globals";

describe("day 13", () => {
    test("create map", () => {
        const map = createMap();

        map.addWall({ x: 497, y: 4 }, { x: 504, y: 4 });
        map.addWall({ x: 497, y: 4 }, { x: 497, y: 2 });

        expect(map.visualize()).toEqual(
            `...+....
             ........
             #.......
             #.......
             ########`.replace(/ +/g, ""),
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
                for (let i = a.x; i <= b.x; i++) {
                    this.set(i, a.y, "#");
                }
            } else if (a.y != b.y) {
                for (let i = b.y; i <= a.y; i++) {
                    this.set(a.x, i, "#");
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
