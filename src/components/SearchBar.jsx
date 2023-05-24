import { Input } from 'antd';
const { Search } = Input;

export function SearchBar({ handleSearch, isLoading }) {
  return (
    <Search data-testid="search-input" loading={isLoading} placeholder="Search" onSearch={handleSearch} />
  )
}