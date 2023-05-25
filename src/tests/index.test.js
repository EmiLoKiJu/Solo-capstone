import songelementcounter from './songelementcounter.js';

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('songelementcounter', () => {
  test('counting', () => {
    // Arrange
    const dom = new JSDOM(`
    <html>
      <body>
      </body>
    </html>`);
    global.document = dom.window.document;
    const bodyelement = document.querySelector('body');

    // Act
    const result = songelementcounter(bodyelement);

    // Assert
    expect(result).toBe(0);
  });
});

  // toBeTruthy