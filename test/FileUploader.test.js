import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { message } from 'antd';
import { translate } from '../src/locales/translator';
import { FileUploader } from '../src/components/FileUploader';

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  return {
    ...originalAntd,
    Upload: {
      ...originalAntd.Upload,
      Dragger: jest.fn().mockImplementation(({ disabled, showUploadList, customRequest, onChange }) => {

        return (
          <div data-testid="drag-and-drop" className={disabled ? 'disabled' : ''}>
            <input
              type="file"
              data-testid="file-input"
              disabled={disabled}
              onChange={(e) => onChange(e.target.files[0])}
            />
          </div>
        );
      }),
    },
    message: {
      ...originalAntd.message,
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe('FileUploader  - Test Suit', () => {
  let handleUpload = jest.fn()

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    handleUpload.mockReturnValue()
  })

  test('Should render Dragger component', () => {
    render(<FileUploader disabled={false} handleUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toBeInTheDocument();
  });

  test('Should display disabled class when disabled is true', () => {
    render(<FileUploader disabled={true} handleUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toHaveClass('disabled');
  });


  test('Should display success message when status is "done"', () => {
    const successMock = jest.spyOn(message, 'success');
    const file = { name: 'test.csv', status: 'done', size: 1000 };
    const info = { file };

    render(<FileUploader disabled={false} handleUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } });
    expect(successMock).toHaveBeenCalledWith(`${file.name} ${translate('upload.successfully-upload')}`);
  });

  test('Should display error message when status is "error" with error message', () => {
    const errorMessage = `test.csv ${translate('upload.failure-upload')}`
    const file = { name: 'test.csv', size: 1000, status: 'error', error: { message: errorMessage } };
    const info = { file };

    render(<FileUploader disabled={false} handleUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(message.error).toHaveBeenCalledWith(errorMessage);
  });

  test('Should display error message when status is "error" without an internal error message', () => {
    const file = { name: 'test.csv', status: 'error', size: 1000 };
    const info = { file };

    render(<FileUploader disabled={false} handleUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(message.error).toHaveBeenCalledWith(`${file.name} ${translate('upload.failure-upload')}`);
  });


});
