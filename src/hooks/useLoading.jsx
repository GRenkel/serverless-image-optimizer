import { useState } from "react";

export default function useLoading(initialState) {
  const LOADING_DELAY = 750
  const [ isLoading, setIsLoading ] = useState(initialState || false);

  const hideLoading = () => setTimeout(() => setIsLoading(false), LOADING_DELAY)
  const showLoading = () => setIsLoading(true)

  return { isLoading, showLoading, hideLoading }
}