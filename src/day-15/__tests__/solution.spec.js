import { describe, expect, test } from "@jest/globals";

describe("day 15", () => {
    test("create map", () => {
        const map = createMap();

        map.addPair({ x: 2, y: 18 }, { x: -2, y: 15 });
        map.addPair({ x: 9, y: 16 }, { x: 10, y: 16 });

        expect(map.visualize()).toEqual(
            `B########..#.
             ###########SB
             ############.
             ####S#######.`.replace(/ +/g, "")
        );
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
        addPair(sensor, beacon) {
            this.add(sensor.x, sensor.y, "S");
            this.add(beacon.x, beacon.y, "B");
            const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
            const maxDistance = distance(sensor, beacon);
            const isInRange = (point) => distance(sensor, point) <= maxDistance;
            for (let y = sensor.y - maxDistance; y <= sensor.y + maxDistance; y++) {
                for (let x = sensor.x - maxDistance; x <= sensor.x + maxDistance; x++) {
                    if (!map[y]?.[x] && isInRange({ x, y })) {
                        (map[y] || (map[y] = []))[x] = "#";
                    }
                }
            }
        },
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
