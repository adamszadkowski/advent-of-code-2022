import { Day7Solution } from "@/day-7/part-1";
import { describe, beforeEach, it, expect } from "@jest/core";

describe("day 7", () => {
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
