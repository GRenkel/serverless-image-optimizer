import { useState } from "react";
import api from "../../services/api"
import useLoading from "../useLoading";

export function useSearchUsers() {
  const [listedUsers, setListedUsers] = useState([]);
  const [error, setError] = useState(null);

  const { isLoading, showLoading, hideLoading } = useLoading();

  const searchUsers = async (value) => {
    showLoading()
    try {
      const response = await api.getUsers(value);
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