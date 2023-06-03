import { render, renderHook, waitFor } from "@testing-library/react";
import useLoading from "../src/hooks/useLoading";
import { act } from "react-test-renderer";

describe("useLoading  - Test Suit", () => {
  test("Should return isLoading false as initial state", () => {
    const { result } = renderHook(useLoading)
    expect(result.current.isLoading).toBe(false)
  })
  test("Should return isLoading true after calling showLoading", async () => {
    const { result, rerender } = renderHook(useLoading)
    act(() => result.current.showLoading())
    await waitFor(() => expect(result.current.isLoading).toBe(true), { timeout: 1000 })
  })
  test("Should return isLoading true after calling hideLoading", async () => {
    const { result, rerender } = renderHook(() => useLoading(true))
    // jest.useFakeTimers();
    act(() => result.current.hideLoading());
    // jest.advanceTimersByTime(750);
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 1000 })
  })
})