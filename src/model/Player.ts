export class Player {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  country: string;
  birthdate: Date;

  constructor(id: number, owner: number, firstname: string, lastname: string, country: string, birthdate: Date) {
    this.id = id;
    this.owner = owner;
    this.firstname = firstname;
    this.lastname = lastname;
    this.country = country;
    this.birthdate = birthdate;
  }
}
