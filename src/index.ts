import convert from "./converter";
import parse from "./parser";
import timer from "./timer";

import { Observable, Tdate } from "./_type";
export { Observable, Tdate };

const cron = (cronExpr: string): Observable<Tdate> => {
    const pred = convert(parse(cronExpr));
    const obs = timer.filter(pred);
    return obs;
};

export default cron;
