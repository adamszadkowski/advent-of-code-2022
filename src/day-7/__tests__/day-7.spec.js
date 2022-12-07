describe("day 6", () => {
    let solution;

    beforeEach(() => {
        solution = new Day7Solution();
    });

    it("extracts multiple commands", () => {
        const input = `$ cd /
$ ls
1 file.txt`;

        expect(solution.extractCommands(input)).toEqual([
            { command: "cd", argument: "/", output: [] },
            { command: "ls", argument: null, output: ["1 file.txt"] },
        ]);
    });

    it("list root files", () => {
        const input = `$ cd /
$ ls
1 file.txt
12 second.txt`;

        expect(solution.listFiles(input)).toEqual([
            { path: "/", name: "file.txt", size: 1 },
            { path: "/", name: "second.txt", size: 12 },
        ]);
    });
});

class Day7Solution {
    listFiles(input) {
        const commands = this.extractCommands(input);
        let path;
        let files = [];
        for (const command of commands) {
            if (command.command === "cd") {
                path = command.argument;
            } else {
                const content = command.output.map((o) => {
                    const [size, name] = o.split(" ");
                    return { path, size: Number(size), name };
                });
                files.push(...content);
            }
        }
        return files;
    }

    extractCommands(input) {
        const [, ...commands] = input.split("$ ");

        return commands
            .map((c) => {
                const sanitized = c.endsWith("\n") ? c.slice(0, -1) : c;
                return this.extractCommand(sanitized);
            });
    }

    extractCommand(input) {
        const [commandLine, ...content] = input.split("\n");
        const [command, argument] = commandLine.split(" ");
        const output = content || [];

        return { command: command, argument: argument || null, output: output };
    }
};
