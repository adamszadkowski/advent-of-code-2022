export class Day11Solution {
    load(input) {
        const [monkeyLine, itemsLine] = input.split("\n");
        const [, monkeyId] = /^Monkey (\d+):$/.exec(monkeyLine);
        const [, itemsList] = /^ {2}Starting items: (.*)$/.exec(itemsLine);
        const items = itemsList.split(", ").map(i => Number(i));

        return [{ monkeyId: Number(monkeyId), items }];
    }
}
