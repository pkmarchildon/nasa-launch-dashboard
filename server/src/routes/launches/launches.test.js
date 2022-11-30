const request = require('supertest');

const app = require('../../app.js');
const { loadPlanetsData } = require('../../models/planets.model.js');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo.js');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /v1/launches', () => {
    test('Should respond with 200 success', async () => {
      const response = await request(app).get('/v1/launches').expect(200);
    });
  });

  describe('Test POST /v1/launches', () => {
    const completeLaunchData = {
      mission: 'PKM001',
      rocket: 'Picksou9',
      target: 'Kepler-62 f',
      launchDate: 'January 17, 2030'
    };

    const launchDataWithoutDate = {
      mission: 'PKM001',
      rocket: 'Picksou9',
      target: 'Kepler-62 f'
    };

    const LaunchDataWithInvalidDate = {
      mission: 'PKM001',
      rocket: 'Picksou9',
      target: 'Kepler-62 f',
      launchDate: 'wrond date'
    };

    test('Should respond with 201 success', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('Should catch missing required properties', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Missing required launch property'
      });
    });
    test('Should catch invalid date format', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(LaunchDataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: 'Invalid launch date'
      });
    });
  });
});
