import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { message } from 'antd';
import { FileUploader } from '../src/components/FileUploader';
import { translate } from '../src/locales/translator';
import { useAPIFileUpload } from '../src/hooks/api/useAPIFileUpload';

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  return {
    ...originalAntd,
    Upload: {
      ...originalAntd.Upload,
      Dragger: jest.fn().mockImplementation(({ disabled, beforeUpload, showUploadList, accept, customRequest, onChange }) => {

        return (
          <div data-testid="drag-and-drop" className={disabled ? 'disabled' : ''}>
            <input
              onInput={(e) => beforeUpload(e.target.files[0].file)}
              type="file"
              accept={accept}
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

jest.mock('../src/hooks/api/useAPIFileUpload', () => ({
  useAPIFileUpload: jest.fn()
}));


describe('FileUploader  - Test Suit', () => {

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    useAPIFileUpload.mockReturnValue({
      error: null,
      isLoading: false,
      uploadResponse: [],
      uploadFileToAPI: jest.fn(),
      validateFile: jest.fn(),
    })
  })

  test('Should render Dragger component', () => {
    render(<FileUploader disabled={false} afterUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toBeInTheDocument();
  });

  test('Should display disabled class when disabled is true', () => {
    render(<FileUploader disabled={true} afterUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toHaveClass('disabled');
  });

  test('Should be configured to accept only text/csv', () => {
    render(<FileUploader disabled={true} afterUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toHaveAttribute('accept', 'text/csv')
  });

  test('Should display success message when status is "done"', () => {
    const successMock = jest.spyOn(message, 'success');
    const file = { name: 'test.csv', status: 'done', size: 1000 };
    const info = { file };

    render(<FileUploader disabled={false} afterUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } });
    expect(successMock).toHaveBeenCalledWith(`${file.name} ${translate('upload.successfully-upload')}`);
  });

  test('Should display error message when status is "error" with error message', () => {
    const errorMessage = `test.csv ${translate('upload.failure-upload')}`
    const file = { name: 'test.csv', size: 1000, status: 'error', error: { message: errorMessage } };
    const info = { file };

    render(<FileUploader disabled={false} afterUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(message.error).toHaveBeenCalledWith(errorMessage);
  });

  test('Should display error message when status is "error" without an internal error message', () => {
    const file = { name: 'test.csv', status: 'error', size: 1000 };
    const info = { file };

    render(<FileUploader disabled={false} afterUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(message.error).toHaveBeenCalledWith(`${file.name} ${translate('upload.failure-upload')}`);
  });

  test('Should display error message when file is too large', () => {
    const file = { name: 'test.csv', status: 'error', size: 2048576 };
    const info = { file };

    useAPIFileUpload.mockReturnValue({
      validateFile: jest.fn().mockReturnValue({ isValid: false, reason: translate('upload.file-too-large') }),
      uploadResponse: []
    })

    render(<FileUploader disabled={false} afterUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.input(fileInput, { target: { files: [info] } })
    expect(message.error).toHaveBeenCalledWith(translate('upload.file-too-large'));
  });

  test('Should call afterUpload when there is a uploadResponse from API', async () => {
    const afterUploadMock = jest.fn();

    useAPIFileUpload.mockReturnValue({
      error: null,
      isLoading: false,
      uploadResponse: [{ name: 'file1.csv' }, { name: 'file2.csv' }],
      uploadFileToAPI: jest.fn(),
      validateFile: jest.fn(),
    })

    render(<FileUploader afterUpload={afterUploadMock} />);

    expect(afterUploadMock).toHaveBeenCalled();

  })

});
