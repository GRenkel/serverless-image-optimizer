import { Input } from 'antd';
import { translator } from "../locales/translator";
const { Search } = Input;

export function SearchBar({ handleOnSearch, isLoading }) {
  return (
    <Search
      loading={isLoading}
      data-testid="search-input"
      onSearch={handleOnSearch}
      placeholder={translator.translate('search.description')}
    />
  )
}