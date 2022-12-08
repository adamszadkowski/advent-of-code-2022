export const findTrees = (input) => {
    let visible = 0;

    const elements = input.split("\n")
        .filter(l => l)
        .map(l => l.split("").filter(e => e).map(e => Number(e)));

    for (let i = 0; i < elements.length; i++) {
        const row = elements[i];

        for (let j = 0; j < row.length; j++) {
            const column = elements.map(r => r[j]);
            const current = row[j];

            if (i === 0 || j === 0 || i === (elements.length - 1) || j === (row.length - 1)) {
                visible += 1;
            } else if (row.slice(0, j).every(e => e < current)) {
                visible += 1;
            } else if (row.slice(j + 1, row.length).every(e => e < current)) {
                visible += 1;
            } else if (column.slice(0, i).every(e => e < current)) {
                visible += 1;
            } else if (column.slice(i + 1, elements.length).every(e => e < current)) {
                visible += 1;
            }
        }
    }

    return visible;
};
