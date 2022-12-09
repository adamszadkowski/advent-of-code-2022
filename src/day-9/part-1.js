export class Day9Solution {
    move(input) {
        const moves = this.decode(input);
        const head = new Point(0, 0);
        const headHistory = [head];
        moves.forEach(m => {
            headHistory.push(head.move(m));
        });
        return { head: headHistory };
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
            case "U": return { x: this.x += 1, y: this.y };
            case "D": return { x: this.x -= 1, y: this.y };
            case "L": return { x: this.x, y: this.y -= 1 };
            case "R": return { x: this.x, y: this.y += 1 };
        }
    }
}
