var request = require('request'),
    config = require('../src/mixins/config.js'),
    json = [
    {
        "name": "Romulo Mont Serrat",
        "subject": "Desafio Sieve",
        "date": "2015-11-08T14:00:00"
    },
    {
        "name": "Luis Pereira",
        "subject": "B2w",
        "date": "2015-11-09T22:20:00"
    },
    {
        "name": "Wagner Martins",
        "subject": "Novos preços dos produtos",
        "date": "2015-11-10T05:25:35"
    },
    {
        "name": "Rosane Silva",
        "subject": "Python com flask",
        "date": "2015-11-11T06:14:10"
    },
    {
        "name": "Aline Campos",
        "subject": "Javascript e React",
        "date": "2015-11-12T12:13:40"
    }
];

describe("Request emails", function() {
  it("Should return emails ordering by date asc", function(done) {
    request("http://localhost:5000/", function(error, response, body){
      expect(JSON.parse(body).pessoas[0]._source.date).toEqual(json[0].date);
      done();
    });
  });

  it("Should return emails filtering by name", function(done) {
    request("http://localhost:5000/?name=rosa", function(error, response, body){
      expect(JSON.parse(body).pessoas[0]._source.name).toEqual(json[3].name);
      done();
    });
  });

  it("Should return emails filtering by subject", function(done) {
    request("http://localhost:5000/?subject=javas", function(error, response, body){
      expect(JSON.parse(body).pessoas[0]._source.subject).toEqual(json[4].subject);
      done();
    });
  });

  it("Should return emails ordering by name desc", function(done) {
    request("http://localhost:5000/?sort=name&order=desc", function(error, response, body){
      expect(JSON.parse(body).pessoas[0]._source.name).toEqual(json[2].name);
      done();
    });
  });

  it("Should return emails filtering by date", function(done) {
    request("http://localhost:5000/?date=2015-11-12", function(error, response, body){
      expect(JSON.parse(body).pessoas[0]._source.date).toEqual(json[4].date);
      done();
    });
  });
});