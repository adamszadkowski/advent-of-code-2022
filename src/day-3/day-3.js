(function () {
    const httpGet = (url) => {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    const splitInHalf = (s) => {
        const halfIndex = s.length / 2;
        return [
            s.substring(0, halfIndex),
            s.substring(halfIndex),
        ];
    };

    const findCommonItem = (i1, i2) => {
        const arr1 = i1.split("");
        const arr2 = i2.split("");

        const intersect = (a1, a2) => a1.find(i => a2.includes(i));

        return intersect(arr1, arr2);
    };

    const toPoints = (e) => {
        const codeOf = (e) => e.charCodeAt(0);
        if (codeOf(e) >= codeOf("a") && codeOf(e) <= codeOf("z"))
            return codeOf(e) - codeOf("a") + 1;
        if (codeOf(e) >= codeOf("A") && codeOf(e) <= codeOf("Z"))
            return codeOf(e) - codeOf("A") + 27;
        throw new Error("Incorrect");
    };

    return httpGet("https://adventofcode.com/2022/day/3/input")
        .split("\n")
        .filter(s => s)
        .map(s => splitInHalf(s))
        .map(([i1, i2]) => findCommonItem(i1, i2))
        .map(e => toPoints(e))
        .reduce((a, c) => a + c);
})();
