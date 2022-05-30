
export const enum dbContextEnum {
  POSTGRES
}

export interface Config {
  dbContext: dbContextEnum
}

export const config: Config = {
  dbContext: dbContextEnum.POSTGRES
}
