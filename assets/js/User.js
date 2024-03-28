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

export class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(name, userName, email, id, pages, groups, canMonetize) {
    super(name, userName, email, id);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() { return this.#pages; }
  get groups() { return this.#groups; }
  get canMonetize() { return this.#canMonetize; }

  getInfo() {
    return `${super.getInfo()}, ${this.#pages}, ${this.#groups}, ${this.#canMonetize}`;
  }
}