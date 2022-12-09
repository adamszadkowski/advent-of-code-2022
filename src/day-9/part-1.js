export class Day9Solution {
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
