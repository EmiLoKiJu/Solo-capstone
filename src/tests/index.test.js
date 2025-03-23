import songelementcounter from './songelementcounter.js';
import commentscounter from './commentscounter.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// counting comments

describe('commentscounter', () => {
  test('counting 0 elements', () => {
    // Arrange
    const dom = new JSDOM(`
    <html>
      <body>
        <div class="commentscounter"></div>
      </body>
    </html>`);
    global.document = dom.window.document;

    // Act
    const result = commentscounter();

    // Assert
    expect(result).toBe(0);
  });

  test('counting 8 elements', () => {
    // Arrange
    const dom = new JSDOM(`
    <html>
      <body>
        <div class="commentscounter">
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
          <div class="commentelement"></div>
        </div>
      </body>
    </html>`);
    global.document = dom.window.document;

    // Act
    const result = commentscounter();

    // Assert
    expect(result).toBe(8);
  });
});

// counting items

describe('songelementcounter', () => {
  test('counting 0 elements', () => {
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
  test('counting 20 elements', () => {
    // Arrange
    const dom = new JSDOM(`
    <html>
      <body>
        <div class="musiccontainer">
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
          <div class="songelementcontainer">
          </div>
        </div>
      </body>
    </html>`);
    global.document = dom.window.document;
    const musiccontainer = document.querySelector('.musiccontainer');

    // Act
    const result = songelementcounter(musiccontainer);

    // Assert
    expect(result).toBe(20);
  });
});