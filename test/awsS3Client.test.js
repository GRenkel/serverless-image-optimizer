import { DEFAULT_BUCKET_NAME, getBucketConfig } from "../src/services/apis/config/awsS3Client";
import { getSessionConfig } from "../src/utils/session";
import { faker } from '@faker-js/faker';

jest.mock('../src/utils/session', () => ({
  getSessionConfig: jest.fn()
}))

describe("awsS3Client - Test Suit", () => {

  test("Should get the bucket config", () => {
    const mockSessionIdentifier = faker.string.uuid()

    const expectedConfig = {
      Bucket: DEFAULT_BUCKET_NAME + mockSessionIdentifier
    }
    
    getSessionConfig.mockReturnValueOnce({
      sessionIdentifier: mockSessionIdentifier
    })

    const bucketConfig = getBucketConfig()

    expect(bucketConfig).toEqual(expectedConfig)
  })

})