export class Day14Solution {
    countSandUnits(input) {
        const map = this.load(input);
        let units = 0;
        while (map.addSandUnit()) { units++; }
        return units;
    }

    load(input) {
        const map = this.createMap();

        input.split("\n").map(l => {
            const points = l.split(" -> ");

            const extract = (p) => {
                const [x, y] = p.split(",");
                return { x, y };
            }

            while (points.length > 0) {
                const [first, second] = points;
                if (second) map.addWall(extract(first), extract(second));
                points.shift();
            }
        });

        return map;
    }

    createMap() {
        const map = [];
        const minY = 0
        let maxY = 0;
        let minX = 500;
        let maxX = 500;

        return {
            addWall(a, b) {
                minX = Math.min(minX, a.x, b.x);
                maxX = Math.max(maxX, a.x, b.x);
                maxY = Math.max(maxY, a.y, b.y);

                if (a.x !== b.x) {
                    for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) {
                        this.set(x, a.y, "#");
                    }
                } else if (a.y != b.y) {
                    for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) {
                        this.set(a.x, y, "#");
                    }
                }
            },
            visualize() {
                this.set(500, 0, "+");
                let result = ""
                for (let y = minY; y <= maxY; y++) {
                    let row = "";
                    for (let x = minX; x <= maxX; x++) {
                        row += this.get(x, y) || ".";
                    }
                    result += row + (y != maxY ? "\n" : "");
                }
                return result;
            },
            set(x, y, s) {
                (map[y] || (map[y] = []))[x] = s;
            },
            get(x, y) {
                return map[y]?.[x];
            },
            addSandUnit() {
                let x = 500;
                let y = 0;
                const isPossible = () => minX <= x && x <= maxX && minY <= y && y <= maxY;

                while (isPossible()) {
                    if (!this.get(x, y + 1)) {
                        y++;
                    } else if (!this.get(x - 1, y + 1)) {
                        y++;
                        x--;
                    } else if (!this.get(x + 1, y + 1)) {
                        y++;
                        x++;
                    } else {
                        this.set(x, y, "o");
                        return true;
                    }
                }

                return false;
            }
        };
    }

}
