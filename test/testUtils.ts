import { QueryResult, FieldDef } from "pg";

export class MockQueryResult implements QueryResult {
  rows: any[];
  command: string;
  rowCount: number;
  oid: number;
  fields: FieldDef[];

  constructor(retval: any, rows: number) {
    this.rows = new Array<any>(retval);
    this.command = "";
    this.rowCount = rows;
    this.oid = 0;
    this.fields = new Array<FieldDef>();
  }
}