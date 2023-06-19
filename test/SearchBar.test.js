import { render,screen, fireEvent } from '@testing-library/react';
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

describe('SearchBar  - Test Suit', () => {
  
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('renders search input', () => {
    render(<SearchBar handleOnSearch={() => {}} isLoading={false} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  test('calls handleOnSearch when search button is clicked', () => {
    const handleSearchMock = jest.fn();
    render(<SearchBar handleOnSearch={handleSearchMock} isLoading={false} />);
    const searchInput = screen.getByTestId('search-input');
    
    fireEvent.change(searchInput, { target: { value: 'search query' } });
    
    expect(handleSearchMock).toHaveBeenCalledTimes(1);
    expect(handleSearchMock).toHaveBeenCalledWith('search query');
  });

  test('displays loading indicator when isLoading is true', () => {
    render(<SearchBar handleOnSearch={() => {}} isLoading={true} />);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveClass('ant-input-search-loading');
  });
})