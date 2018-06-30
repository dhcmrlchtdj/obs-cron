import convert from "./converter";
import parse from "./parser";
import timer from "./timer";
import { Tdate } from "./_type";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

const cron = (cronExpr: string): Observable<Tdate> => {
    const pred = convert(parse(cronExpr));
    const obs = timer.pipe(filter(pred));
    return obs;
};

export default cron;
