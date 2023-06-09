import { renderHook, act } from "@testing-library/react";
import { useSearchUsers } from "../src/hooks/api/useSearchUsers";
import { userAPI } from "../src/services/apis/userAPI";
import { faker } from '@faker-js/faker';
import { translate } from "../src/locales/translator";

jest.mock('../src/services/apis/userAPI', () => ({
  userAPI: {
    get: jest.fn(),
  },
}))

describe("useSearchUsers  - Test Suit", () => {

  const p1_name = faker.person.firstName();
  const p1_city = faker.location.city();
  const p1_country = faker.location.country();
  const p1_sport = faker.person.jobTitle();
  const mockSearchParam = faker.person.firstName();

  const mockUserData = [
    {
      id: faker.string.uuid(),
      name: p1_name,
      city: p1_city,
      country: p1_country,
      favorite_sport: p1_sport
    }
  ];

  test("Should return an empty users list and false for is loading", () => {
    const { result } = renderHook(useSearchUsers)
    expect(result.current.isLoading).toBe(false);
    expect(result.current.listedUsers).toEqual([])
  })

  test("Should return an updated users list", async () => {
    const { result } = renderHook(useSearchUsers)
    expect(result.current.listedUsers).toEqual([])
    await act(async () => result.current.updatedfilesList(mockUserData))
    expect(result.current.listedUsers).toEqual(mockUserData)
  })

  test("Should call the api with the search param", async () => {
    userAPI.get.mockResolvedValueOnce(mockUserData)
    const { result } = renderHook(useSearchUsers)
    await act(async () => result.current.searchUsers(mockSearchParam))
    expect(result.current.listedUsers).toEqual(mockUserData)
  })

  test("Should return an error when api throws an exception", async () => {
    const mockErrorMessage = translate('api.error')
    userAPI.get.mockRejectedValueOnce(new Error(mockErrorMessage))
    const { result } = renderHook(useSearchUsers)
    await act(async () => result.current.searchUsers(''))
    expect(result.current.error).toBe(mockErrorMessage)
  })

})