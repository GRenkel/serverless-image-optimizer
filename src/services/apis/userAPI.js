import { api } from "./config/api"

const paths = {
  users: 'api/users'
};

export const userAPI = {

  get: async (query) => {
    return api.callApi({
      endpoint: paths.users,
      method: "GET",
      options: { params: { q: query } }
    });
  }
}