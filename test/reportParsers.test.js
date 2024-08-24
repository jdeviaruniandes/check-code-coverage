const reportParsers = require('../src/reportParsers');

test('Read clover code coverage from non-existing file', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/reports/foo.xml');
    }).toThrow('Could not find file "./test/reports/foo.xml"');
});

test('Read clover code coverage from an invalid file #1', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/reports/clover-invalid-1.txt');
    }).toThrow("File \"./test/reports/clover-invalid-1.txt\" is not a valid clover file: XML is invalid: Non-whitespace before first tag.\nLine: 0\nColumn: 1\nChar: H");
});

test('Read clover code coverage from an invalid file #2', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/reports/clover-invalid-2.xml');
    }).toThrow('File "./test/reports/clover-invalid-2.xml" is not a valid clover file: Node "<coverage>" is missing');
});

test('Read clover code coverage from an invalid file #3', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();

    expect(() => {
        cloverFileParser.parseFile('./test/reports/clover-invalid-3.xml');
    }).toThrow('File "./test/reports/clover-invalid-3.xml" is not a valid clover file: Metrics attribute "line-rate" is missing');
});

test('Read clover code coverage from a file with no coverage', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();
    const result = cloverFileParser.parseFile('./test/reports/clover-no-coverage.xml');

    expect(result.CodeCoveragePercentage).toBe(0);
});

test('Read clover code coverage from a file with partial coverage', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();
    const result = cloverFileParser.parseFile('./test/reports/clover-partial-coverage.xml');

    expect(result.CodeCoveragePercentage).toBe(63);
});

test('Read clover code coverage from a file with full coverage', () => {
    const cloverFileParser = new reportParsers.CloverFileParser();
    const result = cloverFileParser.parseFile('./test/reports/clover-full-coverage.xml');

    expect(result.CodeCoveragePercentage).toBe(100);
});
