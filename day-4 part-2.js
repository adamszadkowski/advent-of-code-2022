(() => {
    const httpGet = (url) => {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    const range = (d) => {
        const [e1, e2] = d.split("-");
        return [Number(e1), Number(e2)];
    };

    const checkRange = ([a1, b1], [a2, b2]) => a1 <= a2 && a2 <= b2 && b2 <= b1;

    return httpGet("https://adventofcode.com/2022/day/4/input")
        .split("\n")
        .filter(l => l)
        .map(l => l.split(","))
        .map(([e1, e2]) => ({ r1: range(e1), r2: range(e2) }))
        .map((r) => ({ ...r, fullyContain: checkRange(r.r1, r.r2) || checkRange(r.r2, r.r1) }))
        .filter(({ fullyContain }) => fullyContain)
        .length;
})();
