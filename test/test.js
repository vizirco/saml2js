// Saml2js Tests
// =============
// The tests for this module.

var chai    = require('chai'),
    expect  = chai.expect,
    Saml2js = require('../index'),
    fs      = require('fs'),
    parser;

beforeEach('pass SAML response to Saml2js', function(done) {
  fs.readFile(__dirname + '/sample.saml', function(err, data) {
    if (err) throw err;
    parser = new Saml2js(data);
    done();
  });
});

describe('Saml2js', function() {
  describe('#parse()', function() {
    it('should have a value', function() {
      expect(parser.parsedSaml).to.exist;
    });

    it('should return an object', function() {
      expect(parser.parsedSaml).to.be.an('object');
    });

    it('should have at least 8 keys', function() {
      expect(Object.keys(parser.parsedSaml)).to.have.length.of.at.least(8);
    });
  });

  describe('#toJSON()', function() {
    it('should return a string', function() {
      expect(parser.toJSON()).to.be.a('string');
    });

    it('should be valid JSON', function() {
      expect(JSON.parse(parser.toJSON())).to.be.ok;
    });
  });

  describe('#get()', function() {
    it('should get attributes by name', function() {
      expect(parser.get('transfer type')).to.equal('Completed Application');
    });

    it('should get attributes case-insensitively', function() {
      expect(parser.get('FfE ASSIgned Consumer Id')).to.be.a('string');
    });

    it('should return undefined if the key does not exist', function() {
      expect(parser.get('some undefined key')).to.be.undefined;
    });

    it('should return null for empty SAML attributes', function() {
      expect(parser.get('Exception Reason')).to.be.null;
    });
  });

  describe('#toObject()', function() {
    it('should return an object', function() {
      expect(parser.toObject()).to.be.an('object');
    });

    it('should have at last 8 keys', function() {
      expect(Object.keys(parser.toObject())).to.have.length.of.at.least(8);
    });
  });
});
