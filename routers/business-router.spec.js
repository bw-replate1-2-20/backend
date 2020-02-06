const request = require('supertest');
const server = require('../api/server.js');
const businessRouter = ('./business-router.js');

const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');

const authenticate = require("../middleware/auth-jest.js");


jest.mock("../middleware/auth-jest.js");
beforeEach(() => authenticate.mockClear());

describe('businessRouter', function() {
  it('runs the tests', function() {
    expect(true).toBe(true);
  });

  describe('GET /', function() {
    it('no token should return 401 Forbidden', function() {
      // make a GET request to /
      return request(server).get('/api/businesses')
        .then(res => {
        // check that the status code is 401
        expect(res.status).toBe(401);
      });
    });

    it('valid token should return 200 OK', async function() {
      // authenticate.mockImplementationOnce((req, res, next) => {
      //   next();
      // }) // TODO: Why is this suggested?
      const res = await request(server).get('/api/businesses')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });
  });

  describe('GET /:id', function() {
    it('valid id should return 200 OK', async function() {
      const res = await request(server).get('/api/businesses/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );
      expect(res.status).toBe(200);
      expect(res.type).toMatch(/json/i);
    });

    it('valid id should return correct information', async function() {
      const res = await request(server).get('/api/businesses/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );
      expect(res.body.id).toBe(3);
      expect(res.body.email).toBe("manager@costco.com");
      expect(res.body.name).toBe("Costco Wholesale");
      expect(res.body.address).toBe("123 Lots of Stuff Blvd");
      expect(res.body.description).toBe("A bunch of stuff you want, but way too much of it.");
      expect(res.body.phone).toBe("(888) 555-8181");
    });

    it('invalid id should return status 400', async function() {
      const res = await request(server).get('/api/businesses/30')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );
      expect(res.status).toBe(400);
    });

  }); // describe GET /:id

  describe('PUT /:id', function() {
    it('return 200 OK', async function() {
      const res = await request(server).put('/api/businesses/3')
      .set(
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      )
      .send({
        name: "Roscoe Bowl Sale"
      });

      expect(res.status).toBe(200);
      // expect(res.body.name).toBe("Roscoe Bowl Sale");
      // expect(res.body.message).toBe("perfect");
    }); // it

    it('saves changes to the database', function() {
      expect(true).toBe(true); // TODO
    })

  }); // describe PUT /:id
  
  describe('DELETE /:id', function() {
    it('valid id returns 200 OK', async function() {
      const res = await request(server).delete('/api/businesses/7')
      .set( 
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );

      expect(res.status).toBe(200);
    }); // it

    it('invalid id returns 400', async function() {
      const res = await request(server).delete('/api/businesses/60')
      .set( 
        "Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJCIiwiZW1haWwiOiJtYW5hZ2VyQGNvc3Rjby5jb20iLCJpYXQiOjE1ODA5NTA5MDUsImV4cCI6MTU4MTAzNzMwNX0.XaQQXCj2Qa8-PSwUrcnyQsh_kKmvXRo_Nh91NDfIir4"
      );

      expect(res.status).toBe(400);
    }); // it

    it('deleted item is no longer in the database', function() {
      expect(true).toBe(true); // TODO
    }) // it
  }); // describe PUT /:id
}); // describe businessRouter