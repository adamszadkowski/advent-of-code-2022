export class Day12Solution {
    load(input) {
        const width = input.indexOf("\n");
        const height = input.split("\n").filter(l => l).length;

        const find = (v) => {
            const position = input.indexOf(v);
            const x = position % (width + 1);
            const y = -1 * ((position - x) / (width + 1) - height + 1);
            return { x, y };
        };

        return {
            hill({ x, y }) {
                const position = (width + 1) * (height - y - 1);
                let value = input.charCodeAt(position + x);
                if (value === "S".charCodeAt(0)) value = "a".charCodeAt(0);
                else if (value === "E".charCodeAt(0)) value = "z".charCodeAt(0);
                return value - "a".charCodeAt(0);
            },
            exists({ x, y }) {
                return x >= 0 && y >= 0 && x <= (width - 1) && y <= (height - 1);
            },
            getStart() {
                return find("S");
            },
            getEnd() {
                return find("E");
            }
        };
    }
}
