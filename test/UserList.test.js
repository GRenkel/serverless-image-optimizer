import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
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

describe('UserList - Test Suit', () => {
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
    const p1_name = faker.person.firstName();
    const p2_name = faker.person.firstName();
    const p1_city = faker.location.city();
    const p2_city = faker.location.city();
    const p1_country = faker.location.country();
    const p2_country = faker.location.country();
    const p1_sport = faker.person.jobTitle();
    const p2_sport = faker.person.jobTitle();
    
    const userData = [
      { id:faker.string.uuid(), name: p1_name, city: p1_city, country: p1_country, favorite_sport: p1_sport },
      { id:faker.string.uuid(), name: p2_name, city: p2_city, country: p2_country, favorite_sport: p2_sport },
    ];

    render(<UserList userData={userData} isLoading={false}/>);

    const cardMocks = screen.getAllByTestId('card-mock');
    expect(cardMocks).toHaveLength(userData.length);

    const avatarMocks = screen.getAllByTestId('avatar-mock');
    expect(avatarMocks).toHaveLength(userData.length);

    const userNames = screen.getAllByTestId('span-name');
    expect(userNames).toHaveLength(userData.length);

    expect(userNames[0].textContent).toBe(p1_name)
    expect(userNames[1].textContent).toBe(p2_name)

    expect(screen.getByText(`${p1_city}, ${p1_country}`)).toBeInTheDocument();
    expect(screen.getByText(`${p2_city}, ${p2_country}`)).toBeInTheDocument();
    expect(screen.getByText(p1_sport)).toBeInTheDocument();
    expect(screen.getByText(p2_sport)).toBeInTheDocument();
  });

});
