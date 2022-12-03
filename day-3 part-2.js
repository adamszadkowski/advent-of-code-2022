(function () {
    const httpGet = (url) => {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    const chunk = (array, size) =>
        array.reduce((acc, _, i) => {
            if (i % size === 0) acc.push(array.slice(i, i + size))
            return acc
        }, []);

    const findCommonItems = (i1, i2, i3) => {
        const arr1 = i1.split("");
        const arr2 = i2.split("");
        const arr3 = i3.split("");

        const intersect = (a1, a2, a3) => a1.find(i => a2.includes(i) && a3.includes(i));

        return intersect(arr1, arr2, arr3);
    };

    const toPoints = (e) => {
        const codeOf = (e) => e.charCodeAt(0);
        if (codeOf(e) >= codeOf("a") && codeOf(e) <= codeOf("z"))
            return codeOf(e) - codeOf("a") + 1;
        if (codeOf(e) >= codeOf("A") && codeOf(e) <= codeOf("Z"))
            return codeOf(e) - codeOf("A") + 27;
        throw new Error("Incorrect");
    };

    return chunk(httpGet("https://adventofcode.com/2022/day/3/input").split("\n").filter(s => s), 3)
        .map(([i1, i2, i3]) => findCommonItems(i1, i2, i3))
        .map(e => toPoints(e))
        .reduce((a, c) => a + c);
})();
