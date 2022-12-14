export class Day13Solution {
    countCorrectOrder(input) {
        return this.load(input)
            .map(({ first, second }) => this.compare(first, second))
            .reduce((acc, c, i) => acc + (c ? (i + 1) : 0), 0)
    }

    load(input) {
        return input.split("\n\n").map(m => {
            const [first, second] = m.split("\n");
            return { first: eval(first), second: eval(second) };
        });
    }

    compare(first, second) {
        if (!Array.isArray(first) && !Array.isArray(second)) {
            return first < second;
        } else if (Array.isArray(first) && !Array.isArray(second)) {
            return this.compare(first, [second]);
        } else if (!Array.isArray(first) && Array.isArray(second)) {
            return this.compare([first], second);
        } else {
            for (let i = 0; i < Math.min(first.length, second.length); i++) {
                if (this.compare(first[i], second[i])) return true;
                else if (this.compare(second[i], first[i])) return false;
            }
            return first.length < second.length;
        }
    }
}
