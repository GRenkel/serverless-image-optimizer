import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserList } from '../src/components/UserList';
import { translate } from '../src/locales/translator';

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  const cardMock = jest.fn().mockImplementation(({ hoverable, style, children }) => (
    <div data-testid="card-mock" data-hoverable={hoverable} style={style}>
      {children}
    </div>
  ))
  const emptyMock = jest.fn().mockImplementation(({description, children})=>(
    <div data-testid="empty-mock" title={description}>
      {children}
    </div>
  ))
  const avatarMock = jest.fn().mockImplementation(() => <div data-testid="avatar-mock" />)
  return {
    ...originalAntd,
    Card: cardMock,
    Empty: emptyMock,
    Avatar: avatarMock
  };
});

describe('UserList - Suit Test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Should render a skeleton list if is loading', () => { 
    render(<UserList userData={[]} isLoading={true}/>);
    const skeletonCardMocks = screen.getAllByTestId('card-mock');
    expect(skeletonCardMocks).toHaveLength(10);
  })
  test('Should render a empty component if the are no user data to be shown', () => { 
    render(<UserList userData={[]} isLoading={false}/>);
    const emptyList = screen.getAllByTestId('empty-mock');
    expect(emptyList).toHaveLength(1);
    expect(emptyList[0]).toHaveAttribute('title', translate('usersList.empty'));
  })

  test('renders user cards', () => {
    const userData = [
      { id: 1, name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
      { id: 2, name: 'Jane Smith', city: 'London', country: 'UK', favorite_sport: 'Football' },
    ];

    render(<UserList userData={userData} isLoading={false}/>);

    const cardMocks = screen.getAllByTestId('card-mock');
    expect(cardMocks).toHaveLength(userData.length);

    const avatarMocks = screen.getAllByTestId('avatar-mock');
    expect(avatarMocks).toHaveLength(userData.length);

    const userNames = screen.getAllByTestId('span-name');
    expect(userNames).toHaveLength(userData.length);

    expect(userNames[0].textContent).toBe(userData[0].name)
    expect(userNames[1].textContent).toBe(userData[1].name)

    expect(screen.getByText('New York, USA')).toBeInTheDocument();
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('Basketball')).toBeInTheDocument();
    expect(screen.getByText('Football')).toBeInTheDocument();
  });

});
