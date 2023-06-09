import { s3API } from "../src/services/apis/s3API"
import { useS3 } from "../src/hooks/api/useS3"
import { renderHook } from "@testing-library/react"
import { translate } from "../src/locales/translator"
import { act } from "react-test-renderer"
import { largeFile, mockS3ListBucketObjects, mockS3ListResponse, mockS3UploadResponse, mockUseS3ListBucketObjects, smallFile } from "./mocks/fileData"
import { faker } from "@faker-js/faker"

jest.mock('../src/services/apis/s3API', () => ({
  s3API: {
    listBucketObjects: jest.fn(),
    uploadLargeObjectToBucket: jest.fn(),
    uploadCommonObjectToBucket: jest.fn(),
    deleteObjectFromBucket: jest.fn(),
    getDownloadObjectURLFromBucket: jest.fn(),
  }
}))

describe("useS3 - Test Suit", () => {
  
  const mockedAPIErrorResponse = translate('api.error')
  const mockError = new Error(mockedAPIErrorResponse)

  test("Should return isLoading false when first called", () => {
    const { result } = renderHook(useS3)
    expect(result.current.isLoading).toBe(false)
  })

  test("Should call uploadCommonObjectToBucket for small files ", async () => {

    const { result } = renderHook(useS3)

    s3API.uploadCommonObjectToBucket.mockResolvedValueOnce(mockS3UploadResponse)

    await act(async () => result.current.uploadObjectToBucket(smallFile))

    expect(result.current.uploadResponse).toEqual(mockS3UploadResponse)
    expect(result.current.error).toBe(null)
    expect(s3API.uploadCommonObjectToBucket).toHaveBeenCalled()
  })

  test("Should call uploadLargeObjectToBucket for large files ", async () => {
    const { result } = renderHook(useS3)

    s3API.uploadLargeObjectToBucket.mockResolvedValueOnce(mockS3UploadResponse)
    await act(async () => result.current.uploadObjectToBucket(largeFile))

    expect(result.current.uploadResponse).toEqual(mockS3UploadResponse)
    expect(result.current.error).toBe(null)
    expect(s3API.uploadLargeObjectToBucket).toHaveBeenCalled()
  })

  test("Should set internal state error when upload fails", async () => {

    const { result } = renderHook(useS3)

    s3API.uploadCommonObjectToBucket.mockRejectedValueOnce(mockError)

    await act(async () => result.current.uploadObjectToBucket(smallFile))
    expect(result.current.error).toBe(mockedAPIErrorResponse)
  })


  test("Should call listBucketObjects with the expected arguments ", async () => {
    const { result } = renderHook(useS3)
    const mockSearchString = faker.system.commonFileName;

    s3API.listBucketObjects.mockResolvedValueOnce(mockS3ListBucketObjects)
    let response = await result.current.listBucketObjects(mockSearchString)

    expect(response).toEqual(mockUseS3ListBucketObjects)
    expect(result.current.error).toBe(null)
    expect(s3API.listBucketObjects).toHaveBeenCalled()
    expect(s3API.listBucketObjects).toHaveBeenCalledWith(mockSearchString)
  })

  test("Should set an error when listBucketObjects fails ", async () => {
    const { result } = renderHook(useS3)
    const mockObjectKey = faker.system.commonFileName;
    s3API.listBucketObjects.mockRejectedValueOnce(mockError)
    
    await act(async () => result.current.listBucketObjects(mockObjectKey))

    expect(result.current.error).toBe(mockError.message)
  })

  test("Should call removeObjectFromBucket with the expected arguments ", async () => {
    const { result } = renderHook(useS3)
    const mockObjectKey = faker.system.commonFileName;

    await result.current.removeObjectFromBucket(mockObjectKey)

    expect(result.current.error).toBe(null)
    expect(s3API.deleteObjectFromBucket).toHaveBeenCalled()
    expect(s3API.deleteObjectFromBucket).toHaveBeenCalledWith(mockObjectKey)
  })

  test("Should set an error when removeObjectFromBucket fails ", async () => {
    const { result } = renderHook(useS3)
    const mockObjectKey = faker.system.commonFileName;
    s3API.deleteObjectFromBucket.mockRejectedValueOnce(mockError)
    
    await act(async () => result.current.removeObjectFromBucket(mockObjectKey))

    expect(result.current.error).toBe(mockError.message)
  })

  test("Should call getDownloadObjectURLFromBucket with the expected arguments ", async () => {
    const { result } = renderHook(useS3)
    const mockObjectKey = faker.system.commonFileName;

    await result.current.getDownloadObjectURLFromBucket(mockObjectKey)

    expect(result.current.error).toBe(null)
    expect(s3API.getDownloadObjectURLFromBucket).toHaveBeenCalled()
    expect(s3API.getDownloadObjectURLFromBucket).toHaveBeenCalledWith(mockObjectKey)
  })

  test("Should set an error when getDownloadObjectURLFromBucket fails ", async () => {
    const { result } = renderHook(useS3)
    const mockObjectKey = faker.system.commonFileName;

    s3API.getDownloadObjectURLFromBucket.mockRejectedValueOnce(mockError)
    await act(async () => result.current.getDownloadObjectURLFromBucket(mockObjectKey))

    expect(result.current.error).toBe(mockError.message)
  })

})