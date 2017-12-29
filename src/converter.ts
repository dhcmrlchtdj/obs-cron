import { Tnum, Trange, Tstep, Tfield, Tcron, Tdate } from "./_type";

const range = (s: number, e: number, step: number) => {
    const lst = [];
    do {
        lst.push(s);
        s += step;
    } while (s < e);
    lst.push(e);
    return lst;
};

const gen = (field: Tfield) => {
    const _gen: () => (curr: number) => boolean = () => {
        const key = field[0];
        switch (key) {
            case "number":
                return curr => curr === field[1];
            case "range":
                const [l, r] = field[1] as [number, number];
                return curr => l <= curr && r >= curr;
            case "step":
                // @ts-ignore
                const [[_, [ll, rr]], ss] = field[1] as [Trange, number];
                const step = range(ll, rr, ss);
                return curr => step.includes(curr);
            case "list":
                const list = field[1] as Array<Tnum | Trange | Tstep>;
                const fns = list.map(x => gen(x));
                return curr => fns.some(fn => fn(curr));
        }
    };
    const f = _gen();
    return f;
};

const converter = (cron: Tcron) => {
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
