'use strict';
const expect = require('expect');
const test = require('tape');
const constants = require('../constants');
const codepointsToObject = require('../ligatureToEntity').codepointsToObject;
const getFile = require('../ligatureToEntity').getFile;
const ligatureToEntity = require('../index.js').bind({ loaderIndex: 0, loaders: [1] });

// get codepoints object
const codepoints = codepointsToObject(getFile(constants.CODEPOINTS_DIR));


/**
 * get unicode string value of ligature
 * 
 * @param {string} ligature
 * @returns string unicode value
 */
function getUnicode(ligature) {
  return '&#x' + codepoints[ligature] + ';';
};

/**
 * expects array of icon ligatures to return concat'd string of <i> tags 
 * 
 * @param {array} icons
 * @returns string
 */
function generateIconHtml(icons) {
  return icons.map(icon => {
    return `<i className="material-icons">${icon}</i>`
  }).join('\n');
}

// tests main ligatureToUnicode method
test('ligatureToEntity single icon replace in HTML', t => {
  const singleIcon = generateIconHtml(['zoom_in']);
  const singleIconContent = ligatureToEntity(singleIcon);

  t.ok(expect(singleIconContent).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(singleIconContent).toContain(getUnicode('zoom_in')), 'unicode for zoom_out_map has been inserted');

  t.end();
});

// tests main ligatureToUnicode method
test('ligatureToEntity mulitple icon replace in HTML', t => {

  const multipleIcons = generateIconHtml(['zoom_in', 'zoom_out', 'zoom_out_map']);
  const multipleIconsContent = ligatureToEntity(multipleIcons);

  t.ok(expect(multipleIconsContent).toNotContain('zoom_in'), 'ligature zoom_in no longer exists');
  t.ok(expect(multipleIconsContent).toContain(getUnicode('zoom_in')), 'unicode for zoom_in has been inserted');

  t.ok(expect(multipleIconsContent).toNotContain('zoom_out'), 'ligature zoom_out no longer exists');
  t.ok(expect(multipleIconsContent).toContain(getUnicode('zoom_out')), 'unicode for zoom_out has been inserted');

  t.ok(expect(multipleIconsContent).toNotContain('zoom_out_map'), 'ligature zoom_out_map no longer exists');
  t.ok(expect(multipleIconsContent).toContain(getUnicode('zoom_out_map')), 'unicode for zoom_out_map has been inserted');

  t.end();
});