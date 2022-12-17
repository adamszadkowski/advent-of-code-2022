export class Day15Solution {
    countNotBeacon(input) {
        return this.load(input).getRow(10).filter(e => e === "#").length
    }

    load(input) {
        const linePattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
        const map = this.createMap();

        input.split("\n")
            .map(l => {
                const [, sx, sy, bx, by] = linePattern.exec(l);
                return { sensor: { x: Number(sx), y: Number(sy) }, beacon: { x: Number(bx), y: Number(by) } };
            })
            .forEach(({ sensor, beacon }) => map.addPair(sensor, beacon));

        return map;
    }

    createMap() {
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
                        if (!this.get(x, y) && isInRange({ x, y })) {
                            this.set(x, y, "#");
                        }
                    }
                }
            },
            add(x, y, type) {
                updateBoundaries(x, y);
                this.set(x, y, type);
            },
            visualize() {
                let result = "";
                for (let y = min.y; y <= max.y; y++) {
                    let row = "";
                    for (let x = min.x; x <= max.x; x++) {
                        row += this.get(x, y) || ".";
                    }
                    result += row + (y != max.y ? "\n" : "");
                }
                return result;
            },
            set(x, y, type) {
                (map[y] || (map[y] = []))[x] = type;
            },
            get(x, y) {
                return map[y]?.[x];
            },
            getRow(y) {
                return Object.values(map[y]);
            }
        };
    }
}
