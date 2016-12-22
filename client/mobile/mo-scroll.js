import * as iscroll from 'iscroll';


export class MoScrollCustomAttribute {

  static inject = [Element];

  scrollElement;
  options;

  constructor(element) {
    this.element = element;
  }

  attached() {
    this.scrollElement = new iscroll.default(this.element, this.options);
    document.addEventListener('touchmove', (e) => { e.preventDefault(); }, false);
  }

  valueChanged(newValue) {
    this.options = newValue;
  }

  detached() {
    //
  }

}
