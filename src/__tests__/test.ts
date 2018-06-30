import cron from "../";

jest.setTimeout(3 * 60 * 1000);

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
        } else if (flag === 0) {
            sub.unsubscribe();
            const delta = snd - fst;
            expect(delta).toEqual(0);
            done();
        }
    });
});
