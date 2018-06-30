import { timer } from "rxjs";
import { map } from "rxjs/operators";
import { Tdate } from "./_type";

const ONE_MINUTE = 60 * 1000;

const curr = new Date();
const next = new Date(
    curr.getFullYear(),
    curr.getMonth(),
    curr.getDate(),
    curr.getHours(),
    curr.getMinutes() + 1,
    0,
    0,
);

const Otimer = timer(next, ONE_MINUTE).pipe(
    map(() => {
        const date = new Date();
        const tdate: Tdate = {
            minute: date.getMinutes(),
            hour: date.getHours(),
            date: date.getDate(),
            month: date.getMonth(),
            week: date.getDay(),
        };
        return tdate;
    }),
);

export default Otimer;
