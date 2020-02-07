const server = require('../api/server.js');
const request = require('supertest');
const db = require('../data/db-config.js');

const volunteerRouter = ('./volunteer-router.js');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const authenticate = require("../middleware/auth-jest.js");

describe('volunteerRouter', function() {

  it('runs the tests', async function() {
    await expect(true).toBe(true);
  });

  describe ("test environment", function() {
    it("should use the testing environment", async function() {
      await expect(process.env.DB_ENV).toBe("testing");
    });
  });

  describe('GET /', function() {
    it('missing token should return 401 Forbidden', async function() {
      // make a GET request to /
      return await request(server).get('/api/volunteers/')
        .then(res => {
        // check that the status code is 401
        expect(res.status).toBe(401);
      });
    });

    it('valid token should return 200 OK', async function() {
      const res = await request(server).get('/api/volunteers')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });

  describe('GET /:id', function() {
    it('valid id should return 200 OK', async function() {
      const res = await request(server).get('/api/volunteers/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });

    it('valid id should return correct information', async function() {
      const res = await request(server).get('/api/volunteers/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.body.id).toBe(3);
      expect(res.body.email).toBe("bike@couriers.com");
      expect(res.body.name).toBe("Free food bike couriers");
      expect(res.body.phone).toBe("333-333-3333");
    });

    it('invalid id should return status 400', async function() {
      const res = await request(server).get('/api/volunteers/30')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      );
      expect(res.status).toBe(400);
    });

  }); // describe GET /:id

  describe('PUT /:id', function() {
    it('should return 200 OK', async function() {
      const res = await request(server).put('/api/volunteers/1')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
      )
      .send({
        name: "Expensive food bike couriers"
      });

      expect(res.status).toBe(200);
    }); // it

    it('saves changes to the database', function() {
      expect(true).toBe(true); // TODO - needs to be moved with auto-seeding
      // expect(res.body.name).toBe("Roscoe Bowl Sale");
      // expect(res.body.message).toBe("perfect");
    });

  }); // describe PUT /:id
  
  describe('DELETE /:id', function() {
    it('valid id returns 200 OK', async function() {
      const res = await request(server).delete('/api/volunteers/2')
        .set( 
          "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
        );
      expect(res.status).toBe(200);
    }); // it

    it('invalid id returns 400', async function() {
      const res = await request(server).delete('/api/volunteers/20')
        .set( 
          "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODEwMzgyNzksImV4cCI6MTU4MTEyNDY3OX0.pCwCklyfVQ2Y4wzaPQF_zKo4rzWBg7jHNtVUjcxkZpY"
        );
      expect(res.status).toBe(400);
    }); // it

    it('deleted item is no longer in the database', function() {
      expect(true).toBe(true); // TODO - needs to be moved with auto-seeding
    }) // it
  }); // describe PUT /:id
}); // describe volunteerRouter