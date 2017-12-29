import { Observable } from "rxjs/Observable";
export { Observable };

export type Tnum = ["number", number];
export type Trange = ["range", [number, number]];
export type Tstep = ["step", [Trange, number]];
export type Tlist = ["list", Array<Tnum | Trange | Tstep>];
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
