import { getAllByText, render, screen } from '@testing-library/react';
import { FilesList } from '../src/components/FilesList';
import { translate } from '../src/locales/translator';
import { fileData, fileDataWithUpload } from './mocks/fileData';

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  const cardMock = jest.fn().mockImplementation(({ hoverable, style, children }) => (
    <div data-testid="card-mock" data-hoverable={hoverable} style={style}>
      {children}
    </div>
  ))
  const spinMock = jest.fn().mockImplementation(({ tip }) => (
    <div data-testid="spin-comp">
      {tip}
    </div>
  ))
  const emptyMock = jest.fn().mockImplementation(({ description, children }) => (
    <div data-testid="empty-mock" title={description}>
      {children}
    </div>
  ))
  const avatarMock = jest.fn().mockImplementation(() => <div data-testid="avatar-mock" />)
  return {
    ...originalAntd,
    Card: cardMock,
    Empty: emptyMock,
    Avatar: avatarMock,
    Spin: spinMock
  };
});

describe('FilesList - Test Suit', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Should render a skeleton list if is loading', () => {
    render(<FilesList fileData={[]} isLoading={true} />);
    const skeletonCardMocks = screen.getAllByTestId('card-mock');
    expect(skeletonCardMocks).toHaveLength(3);
  })
  test('Should render a empty component if the are no file data to be shown', () => {
    render(<FilesList fileData={[]} isLoading={false} />);
    const emptyList = screen.getAllByTestId('empty-mock');
    expect(emptyList).toHaveLength(1);
    expect(emptyList[0]).toHaveAttribute('title', translate('filesList.empty'));
  })

  test('Should render an uploading card if it has a file being uploaded', () => {
    const { getAllByTestId, getAllByText } = render(<FilesList fileData={fileDataWithUpload} isLoading={false} />);
    const uploadingSpinByTestId = getAllByTestId('spin-comp')
    const uploadingSpinByText = getAllByText(translate("upload.uploading"))

    expect(uploadingSpinByTestId.length).toBe(1)
    expect(uploadingSpinByText.length).toBe(1)
  })

  test('renders file cards', () => {

    render(<FilesList fileData={fileData} isLoading={false} />);

    const cardMocks = screen.getAllByTestId('card-mock');
    expect(cardMocks).toHaveLength(fileData.length);

    const avatarMocks = screen.getAllByTestId('avatar-mock');
    expect(avatarMocks).toHaveLength(fileData.length);

    const fileNames = screen.getAllByTestId('span-name');
    expect(fileNames).toHaveLength(fileData.length);

    const fileSizes = screen.getAllByTestId('span-size');
    expect(fileSizes).toHaveLength(fileData.length);

    expect(fileNames[0].textContent).toBe(fileData[0].name)
    expect(fileNames[1].textContent).toBe(fileData[1].name)

  });

});
