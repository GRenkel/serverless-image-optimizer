import { render,screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar } from '../src/components/SearchBar';


jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  const { Input } = antd;
  return {
    ...antd,
    Input: {
      ...Input,
      Search: jest.fn().mockImplementation(({ onSearch, loading }) => (
        <input
          data-testid="search-input"
          placeholder="Search"
          className={loading ? 'ant-input-search-loading' : ''}
          onChange={(e) => onSearch(e.target.value)}
        />
      )),
    }
  };
});

describe('SearchBar  - Suit Test', () => {
  
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders search input', () => {
    render(<SearchBar handleSearch={() => {}} isLoading={false} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  test('calls handleSearch when search button is clicked', () => {
    const handleSearchMock = jest.fn();
    render(<SearchBar handleSearch={handleSearchMock} isLoading={false} />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'search query' } });
    expect(handleSearchMock).toHaveBeenCalledTimes(1);
    expect(handleSearchMock).toHaveBeenCalledWith('search query');
  });

  test('displays loading indicator when isLoading is true', () => {
    render(<SearchBar handleSearch={() => {}} isLoading={true} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveClass('ant-input-search-loading');
  });
})