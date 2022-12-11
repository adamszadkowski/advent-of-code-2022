export class Day10Solution {
    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/10/input");
        return this.sumOfStrengths(input);
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    sumOfStrengths(input) {
        const cycles = [20, 60, 100, 140, 180, 220];

        return this.strengths(input)
            .filter(({ cycle }) => cycles.includes(cycle))
            .map(({ strength }) => strength)
            .reduce((acc, c) => acc += c);
    }

    strengths(input) {
        return this.cycle(input).map((c) => ({ cycle: c.cycle, x: c.x, strength: c.cycle * c.x }));
    }

    cycle(input) {
        const commands = this.load(input);
        const cycles = [];
        let counter = 1;
        let x = 1;

        while (commands.length > 0) {
            const command = commands.shift();
            if (command.command === "noop") {
                cycles.push({ cycle: counter, command, x });
            } else if (command.command === "addx") {
                cycles.push({ cycle: counter++, command, x });
                cycles.push({ cycle: counter, command, x });
                x += command.x;
            }
            counter++;
        }

        return cycles;
    }

    load(input) {
        return input.split("\n")
            .filter(l => l)
            .map(l => {
                const [command, arg] = l.split(" ");
                return { command, x: (arg && Number(arg)) ?? null };
            });
    }
}
