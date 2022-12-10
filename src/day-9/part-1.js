export class Day9Solution {
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
        const history = [[new Point(0, 0), new Point(0, 0)]];

        moves.forEach(m => {
            const last = history.at(-1);
            const lastHead = last.at(0);
            const nextHead = lastHead.move(m);
            const lastTail = last.at(-1);
            const canMoveTail = !(lastTail.equals(lastHead) || lastTail.equals(nextHead) || lastTail.corners(nextHead) || lastTail.touches(nextHead));
            const nextTail = canMoveTail && lastHead || lastTail;
            history.push([nextHead, nextTail])
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

    move(direction) {
        switch (direction) {
            case "U": return new Point(this.x, this.y + 1);
            case "D": return new Point(this.x, this.y - 1);
            case "L": return new Point(this.x - 1, this.y);
            case "R": return new Point(this.x + 1, this.y);
        }
    }

    equals(point) {
        return point.x === this.x && point.y === this.y;
    }

    corners(point) {
        return (this.x === point.x + 1 && this.y === point.y + 1) ||
            (this.x === point.x - 1 && this.y === point.y + 1) ||
            (this.x === point.x + 1 && this.y === point.y - 1) ||
            (this.x === point.x - 1 && this.y === point.y - 1);
    }

    touches(point) {
        return (this.x === point.x && this.y === point.y + 1) ||
            (this.x === point.x && this.y === point.y - 1) ||
            (this.x === point.x + 1 && this.y === point.y) ||
            (this.x === point.x - 1 && this.y === point.y);
    }
}
