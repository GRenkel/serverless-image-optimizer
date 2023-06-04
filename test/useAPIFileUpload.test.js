import { FileAPI } from "../src/services/apis/fileAPI"
import { useAPIFileUpload } from "../src/hooks/api/useAPIFileUpload"
import { renderHook } from "@testing-library/react"
import { translate } from "../src/locales/translator"
import { act } from "react-test-renderer"

jest.mock('../src/services/apis/fileAPI', () => ({
  FileAPI: {
    uploadCSV: jest.fn()
  }
}))

describe("useAPIFileUpload - Test Suit", () => {

  const mockValidFile = { name: 'test.csv', size: 1000000 };
  const mockInvalidFile = { name: 'test.csv', size: 2048576 };

  test("Should return isLoading false when first called", () => {
    const { result } = renderHook(useAPIFileUpload)
    expect(result.current.isLoading).toBe(false)
  })

  test("Should accept a valid file", () => {
    const { result } = renderHook(useAPIFileUpload)
    const { isValid } = result.current.validateFile(mockValidFile)
    expect(isValid).toBe(true)
  })

  test("Should reject an invalid file with a reason message", () => {
    const { result } = renderHook(useAPIFileUpload)
    const { isValid, reason } = result.current.validateFile(mockInvalidFile)
    expect(isValid).toBe(false)
    expect(reason).toBe(translate('upload.file-too-large'))
  })

  test("Should upload a file successfully", async () => {
    const mockOnSuccess = jest.fn()
    const mockOnError = jest.fn()
    const mockedAPIResponse = ['mock1', 'mock2']
    
    const { result } = renderHook(useAPIFileUpload)

    FileAPI.uploadCSV.mockResolvedValueOnce(mockedAPIResponse)

    await act(async () => result.current.uploadFileToAPI({
      file: mockValidFile,
      onSuccess: mockOnSuccess,
      onError: mockOnError
    }))

    expect(result.current.uploadResponse).toEqual(mockedAPIResponse)
    expect(result.current.error).toBe(null)
    expect(mockOnSuccess).toHaveBeenCalled()
    expect(mockOnError).not.toHaveBeenCalled()
  })

  test("Should set internal state error and call onError callback", async () => {
    const mockOnSuccess = jest.fn()
    const mockOnError = jest.fn()
    const mockedAPIErrorResponse = translate('api.error')
    const mockError = new Error(mockedAPIErrorResponse)
    const { result } = renderHook(useAPIFileUpload)

    FileAPI.uploadCSV.mockRejectedValueOnce(mockError)

    await act(async () => result.current.uploadFileToAPI({
      file: mockValidFile,
      onSuccess: mockOnSuccess,
      onError: mockOnError
    }))

    expect(result.current.uploadResponse).toEqual([])
    expect(result.current.error).toBe(mockedAPIErrorResponse)
    expect(mockOnSuccess).not.toHaveBeenCalled()
    expect(mockOnError).toHaveBeenCalledWith(mockError)
  })
})