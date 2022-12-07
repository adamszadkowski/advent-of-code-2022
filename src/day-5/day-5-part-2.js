(() => {
    const httpGet = (url) => {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    const extractStacks = (definition) => {
        const readStackLine = (line, n) => {
            const [b1, element, b2] = line.slice(n * 4, n * 4 + 3);
            return (b1 == "[" && b2 == "]") ? element : null;
        };

        const stackLines = definition.split("\n");
        const stackCount = (stackLines[0].length + 1) / 4

        const stacks = Array.from({ length: stackCount }, () => []);

        stackLines.forEach((l) => {
            stacks.forEach((s, index) => {
                const e = readStackLine(l, index);
                if (e) s.unshift(e);
            });
        });

        return stacks;
    };

    const extractMoves = (definition) => {
        const pattern = /move (\d+) from (\d+) to (\d+)/i;
        return definition
            .split("\n")
            .filter(l => l)
            .map(l => {
                const [, count, from, to] = pattern.exec(l);
                return { count, from: from - 1, to: to - 1 };
            });
    };

    const move = (stacks, { count, from, to }) => {
        const buffer = [];
        for (let i = 0; i < count; i++) {
            const e = stacks[from].pop();
            buffer.push(e);
        }
        for (let i = 0; i < count; i++) {
            const e = buffer.pop();
            stacks[to].push(e);
        }
    };

    const moveAll = (stacks, moves) => moves.forEach((m) => move(stacks, m));

    const lastElements = (stacks) => stacks.map(s => s.pop());

    const [stacksDefinition, movesDefinition] = httpGet("https://adventofcode.com/2022/day/5/input")
        .split("\n\n");
    const stacks = extractStacks(stacksDefinition);
    const moves = extractMoves(movesDefinition);

    moveAll(stacks, moves);

    return lastElements(stacks)
        .reduce((a, c) => a + c);
})();
