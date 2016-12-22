import {initialize} from 'aurelia-pal-browser';
import {DOM} from 'aurelia-pal';
import * as LogManager from 'aurelia-logging';
import 'hammer-timejs';     //eliminate the 300ms delay on mobile browsers

// Exports
export * from './mo-scroll';
export * from './mo-tap';
export * from './mo-press';
export * from './mo-swipe';

let defaultCSSText = `[mo-scroll]{overflow:hidden}`;

export function configure(aurelia) {
    initialize();
    DOM.injectStyles(defaultCSSText);
    aurelia.globalResources(
        './mo-scroll',
        './mo-tap',
        './mo-press',
        './mo-swipe'
    );
}
