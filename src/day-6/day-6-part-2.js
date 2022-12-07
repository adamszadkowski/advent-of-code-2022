(() => {
    const httpGet = (url) => {
        var r = new XMLHttpRequest();
        r.open("GET", url, false);
        r.send(null);
        return r.responseText;
    }

    const findBeggining = (buffer) => {
        const marker = [];
        for (let i = 0; i < buffer.length; i++) {
            const l = buffer[i];
            if (marker.length === 14) {
                if (new Set(marker).size === 14) {
                    return i;
                } else {
                    marker.shift();
                }
            }
            marker.push(l);
        }
    };

    return findBeggining(httpGet("https://adventofcode.com/2022/day/6/input"));
})();
