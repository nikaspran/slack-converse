'use strict';
import originalExpect from 'expect.js';
import originalSinon from 'sinon';
import sinonExpect from 'sinon-expect';

let enhancedExpect = sinonExpect.enhance(originalExpect, originalSinon, 'toHaveBeen');
enhancedExpect.toHaveBeen = enhancedExpect.toHaveBeen || {}; //enable syntax highlighting
export const expect = enhancedExpect;
export const sinon = originalSinon;


const noop = () => {
};

export const mockPromise = {
  noop: {then: noop, catch: noop},
  resolveTo: (value) => {
    return {
      then: (fn) => {
        fn(value);
        return mockPromise.noop;
      }
    };
  }
};