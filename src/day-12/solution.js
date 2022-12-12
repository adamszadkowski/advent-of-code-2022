export class Day12Solution {
    load(input) {
        const width = input.indexOf("\n");
        const height = input.split("\n").filter(l => l).length;

        return {
            hill(x, y) {
                const position = (width + 1) * (height - y - 1);
                return input.charCodeAt(position + x) - "a".charCodeAt(0);
            },
            exists(x, y) {
                return x >= 0 && y >= 0 && x <= (width - 1) && y <= (height - 1);
            }
        };
    }
}
