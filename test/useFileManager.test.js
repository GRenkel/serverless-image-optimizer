import { renderHook, act } from "@testing-library/react";
import { useFileManager } from "../src/hooks/api/useFileManager";
import useLoading from "../src/hooks/useLoading";
import { faker } from '@faker-js/faker';
import { mockS3ListBucketObjects, mockUseS3ListBucketObjects, smallFile, smallFileUploadResponse } from "./mocks/fileData";

jest.mock("../src/hooks/useLoading");
jest.useFakeTimers();
const mockListBucketObjects = jest.fn();
const mockGetDownloadObjectURLFromBucket = jest.fn();
const mockRemoveObjectFromBucket = jest.fn();
const mockUploadObjectToBucket = jest.fn();
const mockShowLoading = jest.fn();
const mockHideLoading = jest.fn();

jest.mock("../src/hooks/api/useS3", () => {
  const { useS3: originalImplementation } = jest.requireActual('../src/hooks/api/useS3')
  return {
    useS3: () => ({
      ...originalImplementation(),
      listBucketObjects: mockListBucketObjects,
      getDownloadObjectURLFromBucket: mockGetDownloadObjectURLFromBucket,
      removeObjectFromBucket: mockRemoveObjectFromBucket,
      uploadObjectToBucket: mockUploadObjectToBucket,
    })
  }
});

describe("useFileManager - Test Suit", () => {

  beforeEach(() => {
    useLoading.mockReturnValue({
      isLoading: false,
      showLoading: mockShowLoading,
      hideLoading: mockHideLoading,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("searchFiles should call listBucketObjects and update listedFiles", async () => {
    const { result } = renderHook(useFileManager);

    const fileName = faker.system.commonFileName;

    mockListBucketObjects.mockResolvedValueOnce(mockUseS3ListBucketObjects);

    await act(async () => result.current.searchFiles(fileName));

    expect(mockShowLoading).toHaveBeenCalled();
    expect(mockListBucketObjects).toHaveBeenCalledWith(fileName);
    expect(result.current.listedFiles).toEqual(mockUseS3ListBucketObjects);
    expect(result.current.error).toBeNull();
    expect(mockHideLoading).toHaveBeenCalled();
  });

  test("searchFiles should handle error and update error state", async () => {
    const { result } = renderHook(() => useFileManager());

    const fileName = faker.system.commonFileName;
    const errorMessage = "Failed to list bucket objects.";

    mockListBucketObjects.mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => result.current.searchFiles(fileName));

    expect(mockShowLoading).toHaveBeenCalled();
    expect(mockListBucketObjects).toHaveBeenCalledWith(fileName);
    expect(result.current.error).toEqual(errorMessage);
    expect(mockHideLoading).toHaveBeenCalled();
  });

  test("uploadFile should call uploadObjectToBucket, onSuccess, and update listedFiles", async () => {
    const { result } = renderHook(() => useFileManager());

    const file = smallFile.file;
    const response = smallFileUploadResponse
    const onSuccess = jest.fn();

    mockUploadObjectToBucket.mockResolvedValueOnce(response);

    await act(async () => result.current.uploadFile({ file, onSuccess }));
    await act(async () => jest.runAllTimers());

    expect(result.current.listedFiles).toEqual([response]);
    expect(onSuccess).toHaveBeenCalled();
    expect(mockUploadObjectToBucket).toHaveBeenCalledWith({ file });
  });

  test("uploadFile should handle error and call onError", async () => {
    const { result } = renderHook(() => useFileManager());

    const file = smallFile.file;
    const errorMessage = "Failed to upload file.";
    const onError = jest.fn();

    mockUploadObjectToBucket.mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => result.current.uploadFile({ file, onError }));

    expect(result.current.error).toEqual(null);
    expect(onError).toHaveBeenCalledWith(new Error(errorMessage));
    expect(mockUploadObjectToBucket).toHaveBeenCalledWith({ file });
  });

  test("removeFile should call removeObjectFromBucket and update listedFiles", async () => {
    const { result } = renderHook(() => useFileManager());

    const file = mockUseS3ListBucketObjects[0];
    mockListBucketObjects.mockResolvedValueOnce(mockUseS3ListBucketObjects);

    await act(async () => result.current.searchFiles());
    await act(async () => result.current.removeFile(file));

    expect(mockRemoveObjectFromBucket).toHaveBeenCalledWith(file.name);
    expect(result.current.listedFiles).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  test("removeFile should handle error and update error state", async () => {
    const { result } = renderHook(() => useFileManager());

    const { name, id } = mockUseS3ListBucketObjects[0];
    const errorMessage = "Failed to remove file.";

    mockRemoveObjectFromBucket.mockRejectedValueOnce(new Error(errorMessage));

    await act(async () => {
      await result.current.removeFile({ name, id });
    });

    expect(mockRemoveObjectFromBucket).toHaveBeenCalledWith(name);
    expect(result.current.error).toEqual(errorMessage);
  });

  test("downloadFile should call getDownloadObjectURLFromBucket and set window.location.href", async () => {

    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {};

    const { result } = renderHook(() => useFileManager());

    const fileName = smallFile.file.name;
    const downloadURL = "https://example.com/file1.txt";

    mockGetDownloadObjectURLFromBucket.mockResolvedValueOnce(downloadURL);

    await act(async () => result.current.downloadFile(fileName));

    expect(mockGetDownloadObjectURLFromBucket).toHaveBeenCalledWith(fileName);
    expect(window.location.href).toEqual(downloadURL);
    expect(result.current.error).toBeNull();
  });

  test("downloadFile should handle error and update error state", async () => {
    const { result } = renderHook(() => useFileManager());

    const fileName = smallFile.file.name;
    const errorMessage = "Failed to get download URL.";

    mockGetDownloadObjectURLFromBucket.mockRejectedValueOnce(
      new Error(errorMessage)
    );

    await act(async () => result.current.downloadFile(fileName));

    expect(mockGetDownloadObjectURLFromBucket).toHaveBeenCalledWith(fileName);
    expect(result.current.error).toEqual(errorMessage);
  });
});