describe("day 6", () => {
    let solution;

    beforeEach(() => {
        solution = new Day7Solution();
    });

    it("extracts single command without output", () => {
        const input = "cd /";

        expect(solution.extractCommand(input)).toEqual(
            { command: "cd", argument: "/", output: [] },
        );
    });

    it("extracts single command with output", () => {
        const input = `ls
1 file.txt`;

        expect(solution.extractCommand(input)).toEqual(
            { command: "ls", argument: null, output: ["1 file.txt"] },
        );
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
});

class Day7Solution {
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
