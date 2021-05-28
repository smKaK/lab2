const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const setupDB = require('../utils/setupDB');

setupDB();
const url = '/api/v1/reviews/';
let operatedReviewId = '';

describe('Review routes', () => {
  beforeEach(() => {
    let newReview;
    newReview = {
      text: 'This is new awesome review',
      header: 'Awesome review',
      rate: 4,
    };
  });
  describe('GET api/v1/reviews', () => {
    test('should return 200 and apply the default query options', async () => {
      const res = await request(app)
        .get(url)
        .send()
        .expect(httpStatus.OK);
    });
  });

  describe('POST api/v1/reviews', () => {
    beforeEach(() => {
      newReview = {
        text: 'This is new awesome review',
        header: 'Awesome review',
        rate: 4,
      };
    });

    test('should return 201 and successfully create new review if data is ok', async () => {
      const res = await request(app)
        .post(url)
        .send(newReview)
        .expect(httpStatus.CREATED);

      operatedReviewId = res.body.data.data._id;

      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newReview.text),
        header: expect.stringContaining(newReview.header),
        rate: 4,
        __v: 0,
      });
    });

    test("should return error required fields aren't provided", async () => {
      await request(app)
        .post(url)
        .send({ ...newReview, rate: '' })
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('GET api/v1/reviews/:userId', () => {
    test('should return 200 and the review object if data is ok', async () => {
      const res = await request(app)
        .get(url + operatedReviewId)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newReview.text),
        header: expect.stringContaining(newReview.header),
        rate: 4,
        __v: 0,
      });
    });

    test("should return error if review isn't exist", async () => {
      await request(app)
        .get(
          url +
            operatedReviewId.substring(
              0,
              operatedReviewId.length - 1
            ) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
  describe('PATCH api/v1/reviews/:id', () => {
    test("should return error if review isn't exist", async () => {
      await request(app)
        .patch(
          url +
            operatedReviewId.substring(
              0,
              operatedReviewId.length - 1
            ) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });

    test('should return 200 and successfully patch review if data is ok', async () => {
      const res = await request(app)
        .patch(url + operatedReviewId)
        .send({ rate: 5 })
        .expect(httpStatus.OK);

      operatedReviewId = res.body.data.data._id;

      expect(res.body.data.data).toEqual({
        _id: expect.anything(),
        text: expect.stringContaining(newReview.text),
        header: expect.stringContaining(newReview.header),
        rate: 5,
        __v: 0,
      });
    });
  });
  describe('DELETE api/v1/reviews/:id', () => {
    test('should return 204 if id is ok', async () => {
      await request(app)
        .delete(url + operatedReviewId)
        .send()
        .expect(httpStatus.NO_CONTENT);
    });

    test("should return error if review isn't exist", async () => {
      await request(app)
        .delete(
          url +
            operatedReviewId.substring(
              0,
              operatedReviewId.length - 1
            ) +
            '3'
        )
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
