const server = require('../api/server.js');
const request = require('supertest');
const db = require('../data/db-config.js');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const authenticate = require("../middleware/auth-jest.js");
const requestRouter = ('./request-router.js');

beforeEach(() => db.seed.run());
describe('requestRouter', function() {

  it('runs the tests', function() {
    expect(true).toBe(true);
  });

  describe ("test environment", function() {
    it("should use the testing environment", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe('GET /', function() {
    it('missing token should return 401 Forbidden', async function() {
      // make a GET request to /
      return await request(server).get('/api/requests')
        .then(res => {
        // check that the status code is 401
        expect(res.status).toBe(401);
      });
    });

    it('valid token should return 200 OK', async function() {
      // authenticate.mockImplementationOnce((req, res, next) => {
      //   next();
      // }) // TODO: Why is this suggested?
      const res = await request(server).get('/api/requests')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });

  describe('GET /:id', function() {
    it('valid id should return 200 OK', async function() {
      const res = await request(server).get('/api/requests/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });

    it('valid id should return correct information', async function() {
      const res = await request(server).get('/api/requests/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.body.id).toBe(3);
      expect(res.body.title).toBe("Burritos");
      expect(res.body.description).toBe("Gourmet Burritos");
      expect(res.body.quantity).toBe("5");
    });

    it('invalid id should return status 400', async function() {
      const res = await request(server).get('/api/requests/30')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(400);
    });

  }); // describe GET /:id

  describe('PUT /:id', function() {
    it('return 200 OK', async function() {
      const res = await request(server).put('/api/requests/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      )
      .send({
        title: "Tacos"
      });

      expect(res.status).toBe(200);
    }); // it

    it('saves changes to the database', function() {
      expect(true).toBe(true); // TODO
    });

  }); // describe PUT /:id
  
  describe('DELETE /:id', function() {
    it('valid id returns 200 OK', async function() {
      const res = await request(server).delete('/api/requests/4')
      .set( 
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );

      expect(res.status).toBe(200);
    }); // it

    it('invalid id returns 400', async function() {
      const res = await request(server).delete('/api/requests/40')
      .set( 
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );

      expect(res.status).toBe(400);
    }); // it

    it('deleted item is no longer in the database', function() {
      expect(true).toBe(true); // TODO
    }) // it
  }); // describe PUT /:id
}); // describe requestRouter