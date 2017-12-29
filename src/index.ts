type Tnum = ["number", number];
type Trange = ["range", [number, number]];
type Tstep = ["step", [Trange, number]];
type Tlist = ["list", Array<Tnum | Trange | Tstep>];
type Tfield = Tnum | Trange | Tlist | Tstep;
interface Tcron {
    minute: Tfield;
    hour: Tfield;
    date: Tfield;
    month: Tfield;
    week: Tfield;
}
type dateNum = {
    minute: number;
    hour: number;
    date: number;
    month: number;
    week: number;
};

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

const genValidater = (cron: Tcron) => {
    const v = {
        minute: gen(cron.minute),
        hour: gen(cron.hour),
        date: gen(cron.date),
        month: gen(cron.month),
        week: gen(cron.week),
    };

    return ({ minute, hour, date, month, week }: dateNum) => {
        return (
            v.minute(minute) &&
            v.hour(hour) &&
            v.date(date) &&
            v.month(month) &&
            v.week(week)
        );
    };
};
