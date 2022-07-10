import supertest from "supertest";
import app from '../../server'
import * as cosmosDbClient from '../../clients/azure-cosmos-database-client'
import {MOCK_SUBSCRIPTION_SUCCESS_REDIRECT_URL, MOCK_SUBSCRIPTION_ERROR_REDIRECT_URL} from '../../../jest.setup'
const fakeUUID = 'fake_uuid'
const fakeEmail = 'hello@world.com'
jest.mock('../../clients/azure-cosmos-database-client', () => {
  return {
    createSubscriptionItem: jest.fn()
  }
})
jest.mock('uuid', () => {
  return {
    v4: () => fakeUUID
  }
})
const request = supertest(app);

describe('subscription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should redirect to welcome page when email is legal', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: fakeEmail
      })
      .expect(302)
      .expect('Location', MOCK_SUBSCRIPTION_SUCCESS_REDIRECT_URL)
      .end(done)
  })

  it('should include id, email in subscription creation information', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: fakeEmail
      })
      .end(() => {
        expect(cosmosDbClient.createSubscriptionItem).toBeCalledTimes(1)
        expect(cosmosDbClient.createSubscriptionItem).toBeCalledWith({
          id: fakeUUID,
          email: fakeEmail
        })
        done()
      })
  })

  it('should redirect to error page when email is illegal', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: 'helloworld.com'
      })
      .expect(302)
      .expect('Location', MOCK_SUBSCRIPTION_ERROR_REDIRECT_URL)
      .end(done)
  })

  it('should not call create subscription when email is illegal', async (done) => {
    request
      .post('/api/v1/subscribe')
      .send({
        email: 'helloworld.com'
      })
      .end(() => {
        expect(cosmosDbClient.createSubscriptionItem).toBeCalledTimes(0)
        done()
      })
  })
})
