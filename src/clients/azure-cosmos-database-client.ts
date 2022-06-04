import * as Cosmos from '@azure/cosmos'

const endpoint = <string>process.env.DATABASE_ENDPOINT
const key = <string>process.env.DATABASE_KEY

const databaseId = <string>process.env.DATABASE_DATABASE_ID
const containerId = <string>process.env.DATABASE_CONTAINER_ID
const partitionKey = {kind: 'Hash', paths: ['/partitionKey']}

const options = {
  endpoint: endpoint,
  key: key,
};

const client = new Cosmos.CosmosClient(options)

async function createDatabase() {
  const {database} = await client.databases.createIfNotExists({
    id: databaseId
  })
  console.log(`Created database:\n${databaseId}\n`)
}

async function createContainer() {
  const {container} = await client
    .database(databaseId)
    .containers.createIfNotExists(
      {id: containerId, partitionKey}
    )
  console.log(`Created container:\n${containerId}\n`)
}

export async function createSubscriptionItem(subscriptionInfo: any) {
  await createDatabase();
  await createContainer();
  const {item} = await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(subscriptionInfo)
  console.log(`Created subscription item:\n${JSON.stringify(subscriptionInfo)}\n`)
}
