export class Visualizer {
    constructor(size, center) {
        this.size = size;
        this.center = center;
    }

    visualize(input) {
        const matrix = this.createMatrix();

        const getName = (i) => {
            if (i === 0) return "H";
            else if (i === input.length - 1) return "T";
            else return i.toString();
        };

        input.forEach(({ x, y }, index) => {
            const existing = matrix[y + this.center.y][x + this.center.x];
            const existingNumber = Number(existing);
            const isEmpty = existing === ".";
            const isStarting = existing === "s";
            const isTail = existing === "T";
            const isHigher = Number.isFinite(existingNumber) && Number(existing) > Number(getName(index));
            if (isEmpty || isStarting || isTail || isHigher) matrix[y + this.center.y][x + this.center.x] = getName(index);
        });

        return matrix
            .reverse()
            .map((r) => r.join(""))
            .join("\n");
    }

    createMatrix() {
        const matrix = [];
        for (let y = 0; y < this.size.y; y++) {
            const row = [];
            for (let x = 0; x < this.size.x; x++) {
                const sign = y === this.center.y && x === this.center.x ? "s" : "."
                row.push(sign);
            }
            matrix.push(row);
        }
        return matrix;
    }
}
