import { Tfield, Tcron, Tdate } from "./_type";

const seq = (s: number, e: number, step: number) => {
    const lst = [];
    do {
        lst.push(s);
        s += step;
    } while (s < e);
    lst.push(e);
    return lst;
};

const gen: (field: Tfield) => (curr: number) => boolean = (field: Tfield) => {
    switch (field.kind) {
        case "number":
            return curr => curr === field.value;
        case "range":
            const [l, r] = field.value;
            return curr => l <= curr && r >= curr;
        case "step":
            const [range, ss] = field.value;
            const [ll, rr] = range.value;
            const step = seq(ll, rr, ss);
            return curr => step.includes(curr);
        case "list":
            const list = field.value;
            const fns = list.map(x => gen(x));
            return curr => fns.some(fn => fn(curr));
    }
};

const converter:(cron: Tcron) => (date:Tdate) => boolean = (cron: Tcron) => {
    const v = {
        minute: gen(cron.minute),
        hour: gen(cron.hour),
        date: gen(cron.date),
        month: gen(cron.month),
        week: gen(cron.week),
    };

    return ({ minute, hour, date, month, week }: Tdate) => {
        return (
            v.minute(minute) &&
            v.hour(hour) &&
            v.date(date) &&
            v.month(month) &&
            v.week(week)
        );
    };
};

export default converter;
