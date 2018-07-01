const cron = require("../");

jest.setTimeout(5 * 60 * 1000);

test("exception", () => {
    const testCase = [
        "* * * * * *",
        "x * * * *",
        "99 * * * *",
        "1/2 * * * *",
        "3-1 * * * *",
        "*/ * * * *",
        "1-9/ * * * *",
        "1/ * * * *",
        "1- * * * *",
        "1, * * * *",
        "1-2-3 * * * *",
        "1/2/3 * * * *",
        "1,2, * * * *",
    ];
    testCase.forEach(c => expect(() => cron(c)).toThrowErrorMatchingSnapshot());
});

test("base", async () => {
    const current = new Date().getMinutes();
    const testCase = [
        "*",
        "*/1",
        `${current + 1}-${current + 2}`,
        `${current + 1}-${current + 2}/1`,
        `${current + 1},${current + 2}`,
    ];

    expect.assertions(testCase.length);

    const pCases = testCase.map(m => {
        return new Promise(resolve => {
            let flag = 2;
            let fst = 0;
            let snd = 0;
            const sub = cron(`${m} * * * *`).subscribe(() => {
                if (flag === 2) {
                    flag--;
                    fst = new Date().getMinutes();
                } else if (flag === 1) {
                    flag--;
                    snd = new Date().getMinutes();

                    sub.unsubscribe();

                    const delta = snd - fst;
                    expect(delta).toEqual(1);
                    resolve();
                }
            });
        });
    });

    await Promise.all(pCases);
});
