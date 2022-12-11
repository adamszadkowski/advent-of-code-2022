export class Day10Solution {
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
