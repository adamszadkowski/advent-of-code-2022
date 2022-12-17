import { describe, expect, test } from "@jest/globals";

describe("day 15", () => {
    test("create map", () => {
        const map = createMap();

        map.add(2, 18, "S");
        map.add(-2, 15, "B");
        map.add(9, 16, "S");
        map.add(10, 16, "B");

        expect(map.visualize()).toEqual(
            `B............
             ...........SB
             .............
             ....S........`.replace(/ +/g, "")
        )
    });
});

function createMap() {
    const map = [];
    let min;
    let max;

    const updateBoundaries = (x, y) => {
        min = { x: Math.min(min?.x ?? x, x), y: Math.min(min?.y ?? y, y) };
        max = { x: Math.max(max?.x ?? x, x), y: Math.max(max?.y ?? y, y) };
    };

    return {
        add(x, y, type) {
            updateBoundaries(x, y);
            (map[y] || (map[y] = []))[x] = type;
        },
        visualize() {
            let result = "";
            for (let y = min.y; y <= max.y; y++) {
                let row = "";
                for (let x = min.x; x <= max.x; x++) {
                    row += map[y]?.[x] || ".";
                }
                result += row + (y != max.y ? "\n" : "");
            }
            return result;
        },
    };
}
