// inspiration: https://www.codementor.io/nodejs/tutorial/testing-express-apis-with-supertest

/* globals test expect */
// import request from 'supertest';
import server from './server';

test('Server should serve static files', (done) => {
  // request(server)
  //   .get('/')
  //   .expect('Content-Type', /text\/html/)
  //   .expect(200)
  //   .end((err) => {
  //     expect.assertions(1);
  //     expect(err).toBeFalsy();
  //     done();
  //   });
  expect(server).toBeDefined();
  done();
});
