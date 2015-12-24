/**
 * Created by jeffreylaw on 12/10/15.
 */

import jsdom from 'jsdom-no-contextify'
import chai from 'chai';
import chaiImmutable from 'chai-immutable';


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys(window).forEach((key) => {
  console.log(key);
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);
