'use strict';
import originalExpect from 'expect.js';
import originalSinon from 'sinon';
import sinonExpect from 'sinon-expect';

let enhancedExpect = sinonExpect.enhance(originalExpect, originalSinon, 'toHaveBeen');
enhancedExpect.toHaveBeen = enhancedExpect.toHaveBeen || {}; //enable syntax highlighting
export const expect = enhancedExpect;
export const sinon = originalSinon;
