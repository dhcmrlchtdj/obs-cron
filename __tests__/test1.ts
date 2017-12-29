import cron from "../src";

jest.setTimeout(3 * 60 * 1000);

test("every minute", done => {
    cron("* * * * *").subscribe(_ => {
        const date = new Date();
        console.log(date);
        expect(date.getSeconds()).toBe(0);
        done();
    });
});
