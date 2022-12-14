function $() { }

export class Day13Solution {
    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/13/input");
        const result = this.countCorrectOrder(input);
        $("input[name=answer]").value = result;
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    countCorrectOrder(input) {
        const messages = this.load(input);

        let current = 1;
        let result = 0;

        while (messages.length > 0) {
            const first = messages.shift();
            const second = messages.shift();

            const isCorrect = this.compare(first, second);
            result += isCorrect ? current : 0;
            current++;
        }

        return result;
    }

    load(input) {
        return input.replaceAll("\n\n", "\n").split("\n").map(m => eval(m));
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
