import { Input } from 'antd';
import { translate } from "../locales/translator";
const { Search } = Input;

export function UserSearchBar({ handleOnSearch, isLoading }) {
  return (
    <Search data-testid="search-input" loading={isLoading} placeholder={translate('search.description')} onSearch={handleOnSearch} />
  )
}