const cron = require("../");

jest.setTimeout(5 * 60 * 1000);

test("every minute", done => {
    let flag = 2;
    let fst = 0;
    let snd = 0;
    const sub = cron("* * * * *").subscribe(() => {
        console.log(new Date());
        if (flag === 2) {
            flag--;
            fst = new Date().getMinutes();
        } else if (flag === 1) {
            flag--;
            snd = new Date().getMinutes();

            sub.unsubscribe();

            const delta = snd - fst;
            expect(delta).toEqual(1);
            done();
        }
    });
});
