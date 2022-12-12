function $() { }

export class Day11Solution {
    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/11/input");
        const result = this.monkeyBusiness(input);
        $("input[name=answer]").value = result;
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    monkeyBusiness(input) {
        const monkeys = this.load(input);
        const inspectedItems = Array(monkeys.length).fill(0);

        for (let i = 0; i < 20; i++) {
            for (const m of monkeys) {
                while (m.items.length > 0) {
                    const item = m.items.shift();
                    const worryLevel = Math.floor(m.operation(item) / 3);
                    const nextMonkey = m.nextMonkey(worryLevel);
                    monkeys[nextMonkey].items.push(worryLevel);
                    inspectedItems[m.monkeyId]++;
                }
            }
        }

        const results = inspectedItems.sort((a, b) => b - a);
        return results[0] * results[1];
    }

    load(input) {
        return input.split("\n\n").map(m => this.loadMonkey(m));
    }

    loadMonkey(input) {
        const [monkeyLine, itemsLine, operationLine, divisibleLine, trueLine, falseLine] = input.split("\n");
        const [, monkeyId] = /^Monkey (\d+):$/.exec(monkeyLine);
        const [, itemsList] = /^ {2}Starting items: (.*)$/.exec(itemsLine);
        const [, op, value] = /^ {2}Operation: new = old ([*+]) (.*)$/.exec(operationLine);
        const [, divisible] = /^ {2}Test: divisible by (\d+)$/.exec(divisibleLine);
        const [, trueMonkey] = /^ {4}If true: throw to monkey (\d+)$/.exec(trueLine);
        const [, falseMonkey] = /^ {4}If false: throw to monkey (\d+)$/.exec(falseLine);

        const operation = op === "*"
            ? ((a, b) => a * b)
            : ((a, b) => a + b);

        return {
            monkeyId: Number(monkeyId),
            items: itemsList.split(", ").map(i => Number(i)),
            operation: (o) => value === "old" ? operation(o, o) : operation(o, Number(value)),
            nextMonkey: (w) => Number(w % divisible === 0 ? trueMonkey : falseMonkey),
        };
    }
}
