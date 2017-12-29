import { Tcron } from "./_type";

const parser = (cronExpr: string): Tcron => {
    return {
        minute: ["number", 1],
        hour: ["number", 1],
        date: ["number", 1],
        month: ["number", 1],
        week: ["number", 1],
    };
};

export default parser;
