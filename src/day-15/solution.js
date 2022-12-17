export class Day15Solution {
    constructor(desiredRow) {
        this.desiredRow = desiredRow;
    }

    countNotBeacon(input) {
        const range = (from, to) => ({
            rangeFrom: from,
            rangeTo: to,
            distance() { return Math.abs(this.rangeFrom - this.rangeTo); }
        });

        const ranges = this.load(input)
            .map(({ sensor, beacon }) => {
                const fullDistance = sensor.distance(beacon);
                const verticalDistance = Math.abs(sensor.y - this.desiredRow);
                const horizontalDistance = fullDistance - verticalDistance;

                if (sensor.x - horizontalDistance <= sensor.x + horizontalDistance)
                    return range(sensor.x - horizontalDistance, sensor.x + horizontalDistance);
                else
                    return null
            })
            .filter(r => r);

        return this.mergeRanges(ranges)
            .map(r => r.distance())
            .reduce((acc, d) => acc + d, 0);
    }

    load(input) {
        const linePattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;

        const point = (x, y) => ({
            x: Number(x),
            y: Number(y),
            distance({ x, y }) {
                return Math.abs(x - this.x) + Math.abs(y - this.y);
            }
        });

        return input.split("\n")
            .filter(l => l)
            .map(l => {
                const [, sx, sy, bx, by] = linePattern.exec(l);
                return { sensor: point(sx, sy), beacon: point(bx, by) };
            })
    }

    mergeRanges(ranges) {
        const [firstRange, ...sortedRanges] = ranges.sort((a, b) => a.rangeFrom - b.rangeFrom);

        const result = [firstRange];

        for (const current of sortedRanges) {
            const last = result.at(-1);
            if (last.rangeTo < current.rangeFrom) {
                result.push(current);
            } else if (last.rangeTo < current.rangeTo) {
                last.rangeTo = current.rangeTo;
            }
        }

        return result;
    }
}
