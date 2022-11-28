import recepieView from './view/recepieView';

export default class Rules {
  _errorMessages = [];

  constructor(value, label) {
    this.value = value;
    this.label = label;
  }

  #messageMarkup(message) {
    message = message.replace('{value}', this.value);
    return message.replace('{label}', this.label);
  }

  required(message = 'Field {label} is required! ') {
    if (typeof this.value === 'undefined') this.value = '';
    if (this.value == '') {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }

  minLength(
    length = 0,
    message = 'Field {label} must have min ' + length + 'characters!'
  ) {
    if (typeof this.value === 'undefined') this.value = '';
    if (this.value.length < length) {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }

  maxLength(
    length = 0,
    message = 'Field {label} must have max ' + length + 'characters! '
  ) {
    if (typeof this.value === 'undefined') this.value = '';
    if (this.value.length > length) {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }

  emailCheck(message = 'Email must be in correct format! ') {
    const validRgx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.value == '' && !this.value.match(validRgx)) {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }

  urlCheck(message = 'Url is not in correct format!') {
    const validRgx =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;

    if (!this.value == '' && !this.value.match(validRgx)) {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }

  checkPhone(message = 'Phone number is not in correct format!') {
    const validRgx = /^\d{9}$|^\+\d{11,12}$|^00\d{11,12}$/s;
    if (!this.value == '' && !this.value.match(validRgx)) {
      this._errorMessages.push(this.#messageMarkup(message));
    }
    return this;
  }
}
