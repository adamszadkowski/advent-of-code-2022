import { describe, expect, test } from "@jest/globals";

describe("day 13", () => {
    test("create map", () => {
        const map = createMap();

        map.addWall({ x: 497, y: 4 }, { x: 504, y: 4 });

        expect(map.visualize()).toEqual(
            `...+....
             ........
             ........
             ........
             ########`.replace(/ +/g, ""),
        );
    });
});

function createMap() {
    const minY = 0
    let maxY = 0;
    let minX = 500;
    let maxX = 500;

    const map = [];
    const e = [];
    e[500] = "+";
    map[0] = e;

    return {
        addWall(a, b) {
            minX = Math.min(minX, a.x, b.x);
            maxX = Math.max(maxX, a.x, b.x);
            maxY = Math.max(maxY, a.y, b.y);

            for (let i = a.x; i <= b.x; i++) {
                (map[a.y] || (map[a.y] = []))[i] = "#";
            }
        },
        visualize() {
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
    };
}
