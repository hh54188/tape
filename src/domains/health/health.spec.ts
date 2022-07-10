import supertest from "supertest";
import app from '../../server'
jest.mock('../../clients/azure-cosmos-database-client', () => {
  return {
    createSubscriptionItem: jest.fn()
  }
})
const request = supertest(app);

describe('subscription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should return 200 when request health API', async (done) => {
    request
      .get('/api/v1/health')
      .expect(200)
      .end(done)
  })
})
