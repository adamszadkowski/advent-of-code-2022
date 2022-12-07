describe("day 6", () => {
    let solution;

    beforeEach(() => {
        solution = new Day7Solution();
    });

    it("list root files", () => {
        const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

        expect(solution.findDirectories(input)).toEqual(95437);
    });
});

class Day7Solution {
    findDirectories(input) {
        const node = this.listFiles(input);

        let queue = [node];

        const nodes = [];

        while (queue.length > 0) {
            const current = queue.shift();
            if (current.files) queue.push(...current.files);
            if (current.files && current.size <= 100000) nodes.push(current.size);
        }

        return nodes.reduce((acc, c) => acc + c, 0);
    }

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
            const files = [...n.files, ...mapped];
            const result = { path: n.path, files, size: files.reduce((acc, f) => acc + f.size, 0) };
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
