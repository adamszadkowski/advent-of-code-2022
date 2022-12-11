export class Day10Solution {
    solve() {
        const input = this.httpGet("https://adventofcode.com/2022/day/10/input");
        return this.draw(input);
    }

    httpGet(url) {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    draw(input) {
        const cycles = this.cycle(input);

        let result = "";

        while (cycles.length > 0) {
            const c = cycles.shift();
            result += c.crtOn ? "#" : ".";
            if (c.cycle % 40 === 0) result += "\n";
        }

        return result;
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

        const pushCycle = (command) => {
            cycles.push({ cycle: counter, command, x, crtOn: Math.abs((counter - 1) % 40 - x) <= 1 });
            counter++;
        };

        while (commands.length > 0) {
            const command = commands.shift();
            if (command.command === "noop") {
                pushCycle(command);
            } else if (command.command === "addx") {
                pushCycle(command);
                pushCycle(command);
                x += command.x;
            }
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
