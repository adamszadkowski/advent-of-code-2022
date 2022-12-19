function $() { }

export class Day15Solution {
    constructor(desiredRow, searchArea) {
        this.desiredRow = desiredRow;
        this.searchArea = searchArea;
    }

    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/15/input");
        const result = this.countNotBeacon(input);
        $("input[name=answer]").value = result;
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    findNearbyBeaconTuningFrequency(input) {
        const sensors = this.load(input);

        const { x, y } = sensors
            .map(p => this.generateBorder(p))
            .map(g => {
                for (const b of g) {
                    if (b.x >= 0 && b.y >= 0 && b.x <= this.searchArea && b.y <= this.searchArea) {
                        const found = sensors.every((sensor) => {
                            const minimumDistance = sensor.distance;
                            const candidateDistance = sensor.location.distance(b);
                            return minimumDistance < candidateDistance;
                        });
                        if (found) return b;
                    }
                }
                return null;
            })
            .find((b) => b);

        return x * 4000000 + y;
    }

    countNotBeacon(input) {
        const range = (from, to) => ({
            rangeFrom: from,
            rangeTo: to,
            distance() { return Math.abs(this.rangeFrom - this.rangeTo); }
        });

        const ranges = this.load(input)
            .map((sensor) => {
                const fullDistance = sensor.distance;
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

        return input.split("\n")
            .filter(l => l)
            .map(l => {
                const [, sx, sy, bx, by] = linePattern.exec(l);
                return new Sensor(new Point(sx, sy), new Point(bx, by));
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

    * generateBorder(sensor) {
        const distance = sensor.distance + 1;
        let x = sensor.x - 1;
        let y = sensor.y - distance - 1;
        while (y < sensor.y) {
            x += 1;
            y += 1;
            yield new Point(x, y);
        }
        while (x > sensor.x) {
            x -= 1;
            y += 1;
            yield new Point(x, y);
        }
        while (y > sensor.y) {
            x -= 1;
            y -= 1;
            yield new Point(x, y);
        }
        while (x < sensor.x) {
            x += 1;
            y -= 1;
            yield new Point(x, y);
        }
    }
}

class Sensor {
    constructor(sensor, beacon) {
        this.x = sensor.x;
        this.y = sensor.y;
        this.location = sensor;
        this.beacon = beacon;
        this.distance = sensor.distance(beacon);
    }
}

class Point {
    constructor(x, y) {
        this.x = Number(x);
        this.y = Number(y);
    }

    distance(other) {
        return Math.abs(other.x - this.x) + Math.abs(other.y - this.y);
    }
}