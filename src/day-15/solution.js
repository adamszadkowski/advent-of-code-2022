export class Day15Solution {
    countNotBeacon(input) {
        const desiredRow = 10;

        const range = this.load(input)
            .map(({ sensor, beacon }) => {
                const fullDistance = sensor.distance(beacon);
                const verticalDistance = Math.abs(sensor.y - desiredRow);
                const horizontalDistance = fullDistance - verticalDistance;

                return { rangeFrom: sensor.x - horizontalDistance, rangeTo: sensor.x + horizontalDistance };
            })
            .reduce((acc, { rangeFrom, rangeTo }) => ({
                rangeFrom: Math.min(acc?.rangeFrom ?? rangeFrom, rangeFrom),
                rangeTo: Math.max(acc?.rangeTo ?? rangeTo, rangeTo),
            }));

        return Math.abs(range.rangeFrom - range.rangeTo);
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
            .map(l => {
                const [, sx, sy, bx, by] = linePattern.exec(l);
                return { sensor: point(sx, sy), beacon: point(bx, by) };
            })
    }
}
