function $() { }

export class Day12Solution {
    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/12/input");
        const result = this.countUp(input);
        $("input[name=answer]").value = result;
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    countUp(input) {
        const map = this.load(input);
        return this.count({
            start: map.getStart(),
            isEnd(current) { return current.equals(map.getEnd()); },
            canHike(next, current) { return map.exists(next) && (map.hill(next) - map.hill(current)) <= 1; },
        });
    }

    countDown(input) {
        const map = this.load(input);
        return this.count({
            start: map.getEnd(),
            isEnd(current) { return map.hill(current) === 0; },
            canHike(next, current) { return map.exists(next) && (map.hill(current) - map.hill(next)) <= 1; },
        });
    }

    count({ start, isEnd, canHike }) {
        const hills = [start];
        const visited = new Set();

        while (hills.length > 0) {
            const current = hills.shift();
            if (visited.has(current.toString())) continue;
            if (isEnd(current)) return current.distance;

            const next = current.getSides().filter(next => canHike(next, current));
            hills.push(...next);
            visited.add(current.toString());
        }

        throw new Error("Cannot find path");
    }

    load(input) {
        const width = input.indexOf("\n");
        const height = input.split("\n").filter(l => l).length;

        const find = (v) => {
            const position = input.indexOf(v);
            const x = position % (width + 1);
            const y = -1 * ((position - x) / (width + 1) - height + 1);
            return new Hill(x, y);
        };

        const start = find("S");
        const end = find("E");

        return {
            hill({ x, y }) {
                const extract = (v) => v.charCodeAt(0) - "a".charCodeAt(0);

                const line = (width + 1) * (height - y - 1);
                const value = input.charAt(line + x);
                switch (value) {
                    case "S": return extract("a");
                    case "E": return extract("z");
                    default: return extract(value);
                }
            },
            exists({ x, y }) {
                return x >= 0 && y >= 0 && x < width && y < height;
            },
            getStart() {
                return start;
            },
            getEnd() {
                return end;
            }
        };
    }
}

class Hill {
    constructor(x, y, distance = 0) {
        this.x = x;
        this.y = y;
        this.distance = distance;
    }

    toString() {
        return `${this.x}:${this.y}`;
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    getSides() {
        return [
            new Hill(this.x - 1, this.y, this.distance + 1),
            new Hill(this.x + 1, this.y, this.distance + 1),
            new Hill(this.x, this.y - 1, this.distance + 1),
            new Hill(this.x, this.y + 1, this.distance + 1),
        ]
    }
}
