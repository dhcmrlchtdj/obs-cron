import { Tnum, Trange, Tstep, Tlist, Tfield, Tcron } from "./_type";

const parseNum = (min: number, max: number, expr: string): number => {
    const n = Number(expr);
    if (Number.isNaN(n)) throw new Error(`expect Number, got '${expr}'`);
    if (n < min || n > max)
        throw new Error(`${n} not in range [${min}, ${max}]`);
    return n;
};

const parseRange = (min: number, max: number, expr: string): Trange => {
    const range = expr.split("-");
    if (range.length === 2) {
        const [l, r] = range;
        const ll = parseNum(min, max, l);
        const rr = parseNum(min, max, r);
        return { kind: "range", value: [ll, rr] };
    } else {
        throw new Error(`expect range, got '${expr}'`);
    }
};

const parseStep = (min: number, max: number, expr: string): Tstep => {
    const step = expr.split("/");
    if (step.length === 2) {
        const [f, s] = step;
        const r: Trange =
            f === "*"
                ? { kind: "range", value: [min, max] }
                : parseRange(min, max, f);
        const ss = Number(s);
        if (Number.isNaN(ss)) throw new Error(`expect Number, got '${expr}'`);
        return {
            kind: "step",
            value: [r, ss],
        };
    } else {
        throw new Error(`expect step, got '${expr}'`);
    }
};

const parseField = (
    min: number,
    max: number,
    expr: string,
): Tnum | Trange | Tstep => {
    if (expr.includes("/")) {
        return parseStep(min, max, expr);
    } else if (expr.includes("-")) {
        return parseRange(min, max, expr);
    } else if (expr === "*") {
        return { kind: "range", value: [min, max] };
    } else {
        const n = parseNum(min, max, expr);
        return { kind: "number", value: n };
    }
};

const parseFields = (min: number, max: number, exprs: string[]): Tlist => {
    const l = exprs.map(x => parseField(min, max, x));
    return {
        kind: "list",
        value: l,
    };
};

const parse = (min: number, max: number, expr: string): Tfield => {
    const exprs = expr.split(",");
    if (exprs.length === 1) {
        return parseField(min, max, expr);
    } else {
        return parseFields(min, max, exprs);
    }
};

const parser = (cronExpr: string): Tcron => {
    const exprs = cronExpr.split(/\s+/);
    if (exprs.length !== 5)
        throw new Error(`expect cron expression, got '${cronExpr}'`);

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
