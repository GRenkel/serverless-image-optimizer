import { getBucketConfig } from "../src/services/apis/config/awsS3Client";
import { getSessionConfig } from "../src/utils/session";

jest.mock('../src/utils/session', () => ({
  getSessionConfig: jest.fn()
}))

describe("awsS3Client - Test Suit", () => {

  test("Should get the bucket config", () => {
    getSessionConfig.mockReturnValueOnce({
      sessionIdentifier: "123"
    })

    const bucketConfig = getBucketConfig()

    expect(bucketConfig).toEqual({ key: "123" })
  })

})