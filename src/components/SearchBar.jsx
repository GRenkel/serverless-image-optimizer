import { Input } from 'antd';

const { Search } = Input;

export function SearchBar({ handleSearch }) {
  return (
    <Search placeholder="Search" onSearch={handleSearch} />
  )
}