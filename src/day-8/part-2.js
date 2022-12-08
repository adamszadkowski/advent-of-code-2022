export const findTrees = (input) => {
    let bestScore = 0;

    const setScore = (newScore) => {
        if (newScore > bestScore) bestScore = newScore;
    }

    const until = (arr, condition) => {
        let times = 0;
        for (const e of arr) {
            times += 1;
            if (condition(e)) {
                return times;
            }
        }
        return times;
    };

    const elements = input.split("\n")
        .filter(l => l)
        .map(l => l.split("").filter(e => e).map(e => Number(e)));

    for (let i = 0; i < elements.length; i++) {
        const row = elements[i];

        for (let j = 0; j < row.length; j++) {
            const column = elements.map(r => r[j]);
            const current = row[j];

            if (!(i === 0 || j === 0 || i === (elements.length - 1) || j === (row.length - 1))) {
                const left = until(row.slice(0, j).reverse(), e => e >= current);
                const right = until(row.slice(j + 1, row.length), e => e >= current);
                const top = until(column.slice(0, i).reverse(), e => e >= current);
                const bottom = until(column.slice(i + 1, elements.length), e => e >= current);
                setScore(left * right * top * bottom);
            }
        }
    }

    return bestScore;
};
