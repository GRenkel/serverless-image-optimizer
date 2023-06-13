# React AWS S3 File Manager

This is a front-end React application that allows you to upload files to AWS S3, download files from S3, and search for files within the S3 bucket. The project supports uploading large files and utilizes the multi-part upload strategy.

## Features

- Upload files to AWS S3 with custom hook
- Download files from S3
- Search for files within the S3 bucket
- Support for uploading files larger than 5GB
- Utilizes the ANTD library for UI components
- High test coverage with unit tests using Jest

## Installation

To run this application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/GRenkel/S3-FileManager-UI`
2. Navigate to the project directory: `cd S3-FileManager-UI`
3. Install dependencies: `npm install`

## Configuration

Before running the application, you need to provide your AWS S3 credentials and bucket information. Follow the steps below:

1. Open the `src/services/apis/config/awsS3.js` file.
2. Replace `DEFAULT_BUCKET_NAME` with the name of your S3 bucket.
3. Create and `.env` file.
4. Add on `.env` the variable `REACT_APP_AWS_ACCESS_KEY_ID` with your AWS access key.
5. Add on `.env` the variable `REACT_APP_AWS_SECRET_ACCESS_KEY` with your AWS secret access key.

## Usage

Once you have completed the installation and configuration steps, you can start the application by running the following command:

```
npm start
```

The application will be accessible at `http://localhost:3000` in your web browser.

## Running Tests

To run the unit tests and check the test coverage, use the following command:

```
npm test
```

This will execute the Jest test runner and generate a coverage report.

## Technologies Used

- React
- AWS S3
- ANTD (Ant Design)
- Jest (for unit testing)

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, please submit a pull request. Make sure to follow the existing code style and include tests for your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The developers of React, AWS SDK, ANTD, and Jest for their fantastic tools and libraries.
- Stack Overflow and online tutorials for providing valuable resources and guidance.