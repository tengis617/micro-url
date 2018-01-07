
/* eslint-env mocha */
const chai = require('chai');
const chaiHttp = require('chai-http');
const Redis = require('ioredis');

const { REDIS_PORT } = require('../src/config');
const app = require('../src/index');

const { expect } = chai;
const client = new Redis(REDIS_PORT);
chai.use(chaiHttp);


describe('routes unit', () => {
  describe('/GET :id', () => {
    beforeEach(async () => {
      client.flushall();
    });
    it('should return status code 200 when id is valid', (done) => {
      const id = 'abcdef';
      const url = 'https://google.com';
      client.set(id, url);
      chai.request(app).get(`/${id}`).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return status code 400 when id is invalid', (done) => {
      const id = 'abcdeffsa';
      chai.request(app).get(`/${id}`).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should return ok false when id is invalid', (done) => {
      const id = 'abcdeffsa';
      chai.request(app).get(`/${id}`).end((err, res) => {
        expect(res.body.ok).to.equal(false);
        done();
      });
    });
  });
  describe('/POST /generate', () => {
    beforeEach(async () => {
      client.flushall();
    });
    it('should return status code 200 when url is valid', (done) => {
      const url = 'https://google.com';
      chai.request(app).post('/generate').send({ url }).end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('should return status code 400 when url is invalid', (done) => {
      const url = 'google';
      chai.request(app).post('/generate').send({ url }).end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
    });
    it('should return ok false and correct payload when url is invalid', (done) => {
      const url = 'google';
      chai.request(app).post('/generate').send({ url }).end((err, res) => {
        expect(res.body.ok).to.equal(false);
        expect(res.body.message).to.be.a('string');
        done();
      });
    });
    it('should return ok true and correct payload when url is valid', (done) => {
      const url = 'https://www.google.com';
      chai.request(app).post('/generate').send({ url }).end((err, res) => {
        expect(res.body.ok).to.equal(true);
        expect(res.body.id).to.be.a('string');
        expect(res.body.shortUrl).to.be.a('string');
        expect(res.body.longUrl).to.equal(url);
        done();
      });
    });
  });
});
