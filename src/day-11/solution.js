export class Day11Solution {
    load(input) {
        const [monkeyLine, itemsLine, operationLine] = input.split("\n");
        const [, monkeyId] = /^Monkey (\d+):$/.exec(monkeyLine);
        const [, itemsList] = /^ {2}Starting items: (.*)$/.exec(itemsLine);
        const [, op, value] = /^ {2}Operation: new = old ([*+]) (\d+)$/.exec(operationLine);

        const operation = op === "*"
            ? ((a, b) => a * b)
            : ((a, b) => a + b);

        return [{
            monkeyId: Number(monkeyId),
            items: itemsList.split(", ").map(i => Number(i)),
            operation: (o) => operation(o, Number(value)),
        }];
    }
}
