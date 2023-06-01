import { useState } from "react";
import useLoading from "../useLoading";
import { UserAPI } from "../../services/apis/userAPI";

export function useSearchUsers() {
  const [error, setError] = useState(null);
  const [listedUsers, setListedUsers] = useState([]);
  const { isLoading, showLoading, hideLoading } = useLoading();

  const searchUsers = async (value) => {
    showLoading()
    try {
      const response = await UserAPI.get(value);
      setListedUsers(response);
    } catch (error) {
      setError(error.message)
    } finally {
      hideLoading()
    }
  };

  const updatedUsersList = (users) => {
    setListedUsers(users)
  }

  return { error, isLoading, listedUsers, updatedUsersList, searchUsers }
}