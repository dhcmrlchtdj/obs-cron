import cron from "../src";

jest.setTimeout(70 * 1000);

test("crontab", done => {
    cron("* * * * *").subscribe(_ => {
        const date = new Date();
        expect(date.getSeconds()).toBe(0);
        done();
    });
});
