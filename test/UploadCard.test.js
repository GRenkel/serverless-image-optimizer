import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { message, Upload } from 'antd';
import { UploadCard } from '../src/components/UploadCard';
const { Dragger } = Upload;

jest.mock('antd', () => {
  const originalAntd = jest.requireActual('antd');
  return {
    ...originalAntd,
    Upload: {
      ...originalAntd.Upload,
      Dragger: jest.fn().mockImplementation(({ disabled, showUploadList, accept, customRequest, onChange }) => {

        return (
          <div data-testid="drag-and-drop" className={disabled ? 'disabled' : ''}>
            <input type="file" data-testid="file-input" disabled={disabled} onChange={(e) => onChange(e.target.files[0])} />
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

describe('UploadCard', () => {
  test('renders Dragger component', () => {
    render(<UploadCard isLoading={false} handleFileUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toBeInTheDocument();
  });

  test('displays disabled class when isLoading is true', () => {
    render(<UploadCard isLoading={true} handleFileUpload={() => { }} />);
    const dragAndDrop = screen.getByTestId('drag-and-drop');
    expect(dragAndDrop).toHaveClass('disabled');
  });

  test('displays success message when status is "done"', () => {
    const successMock = jest.spyOn(message, 'success');
    const file = { name: 'test.csv', status: 'done' };
    const info = { file };

    render(<UploadCard isLoading={false} handleFileUpload={() => { }} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } });
    expect(successMock).toHaveBeenCalledWith(`${file.name} file uploaded successfully.`);
  });

  test('displays error message when status is "error" with error message', () => {
    const errorMock = jest.spyOn(message, 'error');
    const errorMessage = 'File upload error';
    const file = { name: 'test.csv', status: 'error', error: { message: errorMessage } };
    const info = { file };

    render(<UploadCard isLoading={false} handleFileUpload={() => {}} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(errorMock).toHaveBeenCalledWith(errorMessage);
  });

  test('displays error message when status is "error" without error message', () => {
    const errorMock = jest.spyOn(message, 'error');
    const file = { name: 'test.csv', status: 'error' };
    const info = { file };

    render(<UploadCard isLoading={false} handleFileUpload={() => {}} />);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [info] } })
    expect(errorMock).toHaveBeenCalledWith(`${file.name} file upload failed.`);
  });

});
