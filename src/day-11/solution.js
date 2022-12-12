export class Day11Solution {
    load(input) {
        const [monkeyLine, itemsLine, operationLine, divisibleLine, trueLine, falseLine] = input.split("\n");
        const [, monkeyId] = /^Monkey (\d+):$/.exec(monkeyLine);
        const [, itemsList] = /^ {2}Starting items: (.*)$/.exec(itemsLine);
        const [, op, value] = /^ {2}Operation: new = old ([*+]) (\d+)$/.exec(operationLine);
        const [, divisible] = /^ {2}Test: divisible by (\d+)$/.exec(divisibleLine);
        const [, trueMonkey] = /^ {4}If true: throw to monkey (\d+)$/.exec(trueLine);
        const [, falseMonkey] = /^ {4}If false: throw to monkey (\d+)$/.exec(falseLine);

        const operation = op === "*"
            ? ((a, b) => a * b)
            : ((a, b) => a + b);

        return [{
            monkeyId: Number(monkeyId),
            items: itemsList.split(", ").map(i => Number(i)),
            operation: (o) => operation(o, Number(value)),
            nextMonkey: (w) => Number(w % divisible === 0 ? trueMonkey : falseMonkey),
        }];
    }
}
