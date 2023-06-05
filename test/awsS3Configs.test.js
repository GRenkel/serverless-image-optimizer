import { DEFAULT_BUCKET_NAME, awsS3Configs } from "../src/services/apis/config/awsS3Configs";
import { getSessionConfig } from "../src/utils/session";
import { faker } from '@faker-js/faker';
import { S3Client } from "@aws-sdk/client-s3";

jest.mock('../src/utils/session', () => ({
  getSessionConfig: jest.fn()
}))

jest.mock('@aws-sdk/client-s3', () => {
  const originalModule = jest.requireActual('@aws-sdk/client-s3')
  return {
    ...originalModule,
    S3Client: jest.fn()
  }
})

describe("awsS3Client - Test Suit", () => {

  test("Should get the bucket config", () => {
    const mockSessionIdentifier = faker.string.uuid()

    const expectedConfig = {
      Bucket: DEFAULT_BUCKET_NAME + mockSessionIdentifier
    }

    getSessionConfig.mockReturnValueOnce({
      sessionIdentifier: mockSessionIdentifier
    })

    const bucketConfig = awsS3Configs.getBucketConfig()

    expect(bucketConfig).toEqual(expectedConfig)
  })

  test("Should initiate S3 client with the expected params", () => {

    const mockRegion = 'us-east-2'
    const mockCredentials = {
      accessKeyId: faker.string.uuid(),
      secretAccessKey: faker.string.uuid(),
    }

    const mockConfig = {
      region: mockRegion,
      credentials: mockCredentials
    }
    awsS3Configs.initiateS3Client(mockConfig)
    expect(S3Client).toHaveBeenCalledWith(mockConfig)
  })

  test("Should call send the command on the given client", async () => {
    const client = { send: jest.fn() }
    const command = "testing command"
    await awsS3Configs.sendS3Command(client, command)
    expect(client.send).toHaveBeenCalledWith(command)
  })

})