export class User {
  #name;
  #userName;
  #email;
  #id;

  constructor(name, userName, email, id) {
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
    this.#id = id;
  }

  get name() { return this.#name; }
  get userName() { return this.#userName; }
  get email() { return this.#email; }
  get id() { return this.#id; }

  getInfo() {
    return `${this.#name}, ${this.#userName}, ${this.#email}`;
  }
}