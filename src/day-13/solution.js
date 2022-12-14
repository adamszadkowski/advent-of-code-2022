export class Day13Solution {
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
