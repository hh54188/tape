import supertest from "supertest";
import app from '../server'
import * as cosmosDbClient from '../clients/azure-cosmos-database-client'
jest.mock('../clients/azure-cosmos-database-client', () => {
  return {
    createSubscriptionItem: jest.fn()
  }
})
const request = supertest(app);

describe('subscription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })
  it('should return 200 status code when email is legal', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: 'hello@world.com'
      })
      .expect(200)
      .end(() => {
        expect(cosmosDbClient.createSubscriptionItem).toBeCalledTimes(1)
        done()
      })
  })

  it('should return 400 status code when email is illegal', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: 'helloworld.com'
      })
      .expect(400)
      .end(() => {
        expect(cosmosDbClient.createSubscriptionItem).toBeCalledTimes(0)
        done()
      })
  })
})
