import Rules from './rulesValidator';

export default class Validator {
  errors = [];
  #rules = {};
  constructor(data) {
    this.data = data;
  }

  /**
   *
   * @param {string} name
   * @returns {Rules}
   */
  setRules(name) {
    const rules = new Rules(this.data?.[name], name);
    this.#rules[name] = rules;
    return this.#rules[name];
  }

  isValid() {
    for (const [name, rules] of Object.entries(this.#rules)) {
      if (rules._errorMessages.length > 0) {
        this.errors = [...this.errors, ...rules._errorMessages];
      }
    }
    return this.errors.length == 0;
  }

  getErrors() {
    return this.errors;
  }
}
