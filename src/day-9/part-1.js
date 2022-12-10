export class Day9Solution {
    constructor(size = 2) {
        this.size = size;
    }

    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/9/input");
        return this.countDistinctTailMoves(input);
    }

    countDistinctTailMoves(input) {
        const moves = this.move(input).map(m => m.at(-1));

        return [...new Set(moves.map(({ x, y }) => `${x}:${y}`))].length;
    }

    move(input) {
        const moves = this.decode(input);
        const history = [Array(this.size).fill(new Point(0, 0))];

        moves.forEach(m => {
            let [lastTop, ...last] = history.at(-1);
            let nextTop = lastTop.move(m);
            const nexts = [nextTop];

            while (nexts.length < this.size) {
                let lastBottom = last.shift();
                let nextBottom = lastBottom;
                if (!lastBottom.around(nextTop)) {
                    const d = lastBottom.delta(nextTop);
                    nextBottom = new Point(lastBottom.x - Math.sign(d.x), lastBottom.y - Math.sign(d.y));
                }

                nexts.push(nextBottom);
                nextTop = nextBottom;
                lastTop = lastBottom;
            }

            history.push(nexts);
        });

        return history;
    }

    decode(input) {
        const result = [];
        input.split("\n")
            .filter(l => l)
            .forEach((move) => {
                let [direction, count] = move.split(" ");
                while (count--) { result.push(direction); }
            });
        return result;
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(...directions) {
        return directions.reduce((acc, d) => {
            switch (d) {
                case "U": return new Point(acc.x, acc.y + 1);
                case "D": return new Point(acc.x, acc.y - 1);
                case "L": return new Point(acc.x - 1, acc.y);
                case "R": return new Point(acc.x + 1, acc.y);
            }
        }, this);
    }

    around(point) {
        const d = this.delta(point);
        return Math.abs(d.x) <= 1 && Math.abs(d.y) <= 1;
    }

    delta(point) {
        return { x: this.x - point.x, y: this.y - point.y };
    }
}
