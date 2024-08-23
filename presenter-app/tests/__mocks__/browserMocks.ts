// Mock Browser API's which are not supported by JSDOM, e.g. ServiceWorker, LocalStorage
/**
 * An example how to mock localStorage is given below 👇
 */

// Mocks localStorage
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => store[key] = value.toString()),
    clear: jest.fn(() => store = {})
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

