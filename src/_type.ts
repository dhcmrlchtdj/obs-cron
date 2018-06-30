export type Tnum = {
    kind: "number";
    value: number;
};

export type Trange = {
    kind: "range";
    value: [number, number];
};

export type Tstep = {
    kind: "step";
    value: [Trange, number];
};

export type Tlist = {
    kind: "list";
    value: Array<Tnum | Trange | Tstep>;
};

export type Tfield = Tnum | Trange | Tlist | Tstep;

export interface Tcron {
    minute: Tfield;
    hour: Tfield;
    date: Tfield;
    month: Tfield;
    week: Tfield;
}

export interface Tdate {
    minute: number;
    hour: number;
    date: number;
    month: number;
    week: number;
}
