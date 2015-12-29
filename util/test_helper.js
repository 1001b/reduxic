/**
 * Created by jeffreylaw on 12/10/15.
 */
//
import jsdom from 'jsdom-no-contextify';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

//
////TODO may use jasmine for JSX testing as it has support for React
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
