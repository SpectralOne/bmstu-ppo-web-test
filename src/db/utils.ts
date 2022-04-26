import { Pool } from "pg";
import { ConnParams } from "../types/ConnParams";

export const q = async (q: string, conn: Pool) => {
    try {
        return await conn.query(q);
    } catch (err) {
        return null;
    }
}

export const coerceDate = (date: Date) => {
    if (date.getTimezoneOffset() != 0)
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return date;
}

export const buildConn = (connParams: ConnParams) => {
    return new Pool(connParams);
}