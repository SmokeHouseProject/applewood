import Hammer from 'hammerjs';

export class MoPressCustomAttribute {

  static inject = [Element];

  constructor(element) {
    this.hammer = new Hammer.Manager(element, {
      recognizers: [
        [Hammer.Press]
      ]
    });
    this.element = element;
  }

  attached() {
    this.hammer.on('press', this.handleSwipe.bind(this));
  }

  detached() {
    this.hammer.off('press', this.handleSwipe.bind(this));
  }

  valueChanged(newValue) {
    this.callback = newValue;
  }

  handleSwipe(event) {
    if (this.callback) {
      this.callback.call(null, { hammerEvent: event });
    }
  }
}
