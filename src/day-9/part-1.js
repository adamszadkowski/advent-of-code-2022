export class Day9Solution {
    decode(input) {
        const result = [];
        let [direction, count] = input.split(" ");
        while (count--) { result.push(direction); }
        return result;
    }
}
