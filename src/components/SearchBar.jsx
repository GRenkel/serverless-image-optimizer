import { Input } from 'antd';
import { translate } from "../locales/i18n";
const { Search } = Input;

export function SearchBar({ handleSearch, isLoading }) {
  return (
    <Search data-testid="search-input" loading={isLoading} placeholder={translate('search.description')} onSearch={handleSearch} />
  )
}