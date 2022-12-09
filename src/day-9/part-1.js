export class Day9Solution {
    move(input) {
        const moves = this.decode(input);
        const head = new Point(0, 0);
        const tail = new Point(0, 0);
        const headHistory = [head];
        const tailHistory = [tail];

        moves.forEach(m => {
            const lastHead = headHistory.at(-1);
            const nextHead = lastHead.move(m);
            const lastTail = tailHistory.at(-1);
            if (!lastHead.equals(lastTail)) {
                if (!lastTail.equals(nextHead)) {
                    tailHistory.push(lastHead);
                }
            }
            headHistory.push(nextHead);
        });
        return { head: headHistory, tail: tailHistory };
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
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(direction) {
        switch (direction) {
            case "U": return new Point(this.x + 1, this.y);
            case "D": return new Point(this.x - 1, this.y);
            case "L": return new Point(this.x, this.y - 1);
            case "R": return new Point(this.x, this.y + 1);
        }
    }

    equals(point) {
        return point.x === this.x && point.y === this.y;
    }
}
