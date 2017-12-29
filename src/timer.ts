import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
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

const timer: Observable<Tdate> = Observable.timer(next, ONE_MINUTE).map(_ => {
    const date = new Date();
    return {
        minute: date.getMinutes(),
        hour: date.getHours(),
        date: date.getDate(),
        month: date.getMonth(),
        week: date.getDay(),
    };
});

export default timer;
