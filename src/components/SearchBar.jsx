import { Input } from 'antd';

const { Search } = Input;

export function SearchBar({ handleSearch, isLoading }) {
  return (
    <Search loading={isLoading} placeholder="Search" onSearch={handleSearch} />
  )
}