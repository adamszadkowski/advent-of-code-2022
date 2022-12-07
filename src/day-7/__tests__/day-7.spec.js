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
12 second.txt
dir second-level
dir other-dir
$ cd second-level
$ ls
8 other.txt
dir third-level
$ cd third-level
$ ls
9 file.txt
$ cd ..
$ cd ..
$ cd other-dir
$ ls
4 next.txt`;

        expect(solution.listFiles(input)).toEqual(
            {
                path: "/",
                files: [
                    { name: "file.txt", size: 1 },
                    { name: "second.txt", size: 12 },
                    {
                        path: "/second-level/",
                        files: [
                            { name: "other.txt", size: 8 },
                            {
                                path: "/second-level/third-level/",
                                files: [
                                    { name: "file.txt", size: 9 },
                                ],
                            },
                        ],
                    },
                    {
                        path: "/other-dir/",
                        files: [
                            { name: "next.txt", size: 4 },
                        ]
                    },
                ],

            },
        );
    });
});

class Day7Solution {
    listFiles(input) {
        const [, ...commands] = this.extractCommands(input);
        const root = { parent: null, path: "/", childs: [] };
        let current = root;
        for (const command of commands) {
            if (command.command === "cd") {
                if (command.argument === "..") {
                    current = current.parent;
                } else {
                    let path = `${current.path}${command.argument}`;
                    path = path.endsWith("/") ? path : `${path}/`;
                    const existingChild = current.childs.find((e) => e.path === path);
                    if (!existingChild) {
                        const newChild = { parent: current, path: path, childs: [] };
                        current.childs.push(newChild);
                        current = newChild;
                    } else {
                        current = existingChild;
                    }
                }
            } else {
                const content = command.output
                    .filter((o) => !o.startsWith("dir"))
                    .map((o) => {
                        const [size, name] = o.split(" ");
                        return { size: Number(size), name };
                    });
                current.files = content;
            }
        }

        const mapNode = (n) => {
            const mapped = n.childs.map((c) => mapNode(c));
            const result = { path: n.path, files: [...n.files, ...mapped] };
            return result;
        };

        return mapNode(root);
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
