import { renderHook, act } from "@testing-library/react";
import { useSearchUsers } from "../src/hooks/api/useSearchUsers";
import { UserAPI } from "../src/services/apis/userAPI";
import { faker } from '@faker-js/faker';

jest.mock('../src/services/apis/userAPI', () => ({
  UserAPI: {
    get: jest.fn(),
  },
}))

describe("useSearchUsers  - Test Suit", () => {
  test("Should return an empty users list and false for is loading", () => {
    const { result } = renderHook(useSearchUsers)
    expect(result.current.isLoading).toBe(false);
    expect(result.current.listedUsers).toEqual([])
  })

  test("Should call the api with the search param", async () => {
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

    UserAPI.get.mockResolvedValueOnce(mockUserData)
    const { result } = renderHook(useSearchUsers)
    await act(async () => result.current.searchUsers(mockSearchParam))
    expect(result.current.listedUsers).toBe(mockUserData)
  })

})