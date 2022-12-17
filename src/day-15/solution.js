export class Day15Solution {
    countNotBeacon(input) {
        return this.load(input).getRow(10).filter(e => e === "#").length
    }

    load(input) {
        const linePattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;
        const map = this.createMap();

        const point = (x, y) => ({
            x: Number(x),
            y: Number(y),
            distance({ x, y }) {
                return Math.abs(x - this.x) + Math.abs(y - this.y);
            }
        });

        input.split("\n")
            .map(l => {
                const [, sx, sy, bx, by] = linePattern.exec(l);
                return { sensor: point(sx, sy), beacon: point(bx, by) };
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
                const maxDistance = sensor.distance(beacon);
                const isInRange = (point) => sensor.distance(point) <= maxDistance;

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
