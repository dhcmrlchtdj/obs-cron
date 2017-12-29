import { Trange, Tstep, Tlist, Tfield, Tcron } from "./_type";

const inside = (min: number, max: number, expr: string): number => {
    const n = Number(expr);
    if (Number.isNaN(n)) throw new Error("err");
    if (n < min || n > max) throw new Error("err");
    return n;
};

const parseRange = (min: number, max: number, expr: string): Trange => {
    const range = expr.split("-");
    if (range.length === 2) {
        const [l, r] = range;
        const ll = inside(min, max, l);
        const rr = inside(min, max, r);
        return ["range", [ll, rr]];
    } else {
        throw new Error("error");
    }
};

const parseStep = (min: number, max: number, expr: string): Tstep => {
    const step = expr.split("/");
    if (step.length === 2) {
        const [f, s] = step;
        const r: Trange =
            f === "*" ? ["range", [min, max]] : parseRange(min, max, f);
        const ss = Number(s);
        if (Number.isNaN(ss)) throw new Error("err");
        return ["step", [r, ss]];
    } else {
        throw new Error("error");
    }
};

const parse = (min: number, max: number, expr: string): Tfield => {
    const exprs = expr.split(",");
    if (exprs.length === 1) {
        if (/\//.test(expr)) {
            return parseStep(min, max, expr);
        } else if (/-/.test(expr)) {
            return parseRange(min, max, expr);
        } else if (expr === "*") {
            return ["range", [min, max]];
        } else {
            const n = inside(min, max, expr);
            return ["number", n];
        }
    } else {
        const l = exprs.map(x => parse(min, max, x));
        return ["list", l] as Tlist;
    }
};

const parser = (cronExpr: string): Tcron => {
    const exprs = cronExpr.split(/\s+/);
    if (exprs.length !== 5) throw new Error("error");

    const [minuteExpr, hourExpr, dateExpr, monthExpr, weekExpr] = exprs;
    const cron = {
        minute: parse(0, 59, minuteExpr),
        hour: parse(0, 23, hourExpr),
        date: parse(1, 31, dateExpr),
        month: parse(1, 12, monthExpr),
        week: parse(0, 6, weekExpr),
    };

    return cron;
};

export default parser;
