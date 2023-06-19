# Serverless Image Optimizater

This repository contains a serverless architecture for image optimization using AWS S3, AWS Cognito, and AWS Lambda functions. The project provides functionalities for user management, including user creation, login, session control, and password recovery using AWS Cognito. Additionally, it implements image optimization by leveraging Lambda functions to automatically optimize and save images in an S3 bucket.

## Prerequisites

Before running the project, make sure you have completed the following steps:

1. Set up an AWS Cognito user pool in your AWS account.
2. Obtain the User Pool ID and the Client ID for your Cognito user pool.
3. Create an S3 bucket in your AWS account.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/GRenkel/serverless-image-optimizer.git
   ```

2. Navigate to the project directory:

   ```
   cd serverless-image-optimizer
   ```

3. Create a `.env` file in the root directory of the project.

4. Open the `.env` file and add the following environment variables:

   ```
   REACT_APP_USERPOOL_ID=<your-userpool-id>
   REACT_APP_CLIENT_ID=<your-client-id>
   REACT_APP_S3_BUCKET_NAME=<your-s3-bucket-name>
   ```

   Replace `<your-userpool-id>`, `<your-client-id>`, and `<your-s3-bucket-name>` with the actual values for your AWS Cognito user pool and S3 bucket.

5. Install the dependencies:

   ```
   npm install
   ```

6. Start the development server:

   ```
   npm start
   ```

   The project will be running at [http://localhost:3000](http://localhost:3000).

## Usage

Once the project is running, you can access the user management features through the provided UI. The implemented functionalities include:

- User creation: Register new users by providing the required information.
- Login: Allow existing users to log in using their credentials.
- Session control: Manage user sessions and implement session-based authentication.
- Password recovery: Enable users to reset their passwords if forgotten.

The project also includes serverless image optimization. Whenever a user uploads an image, AWS Lambda functions are triggered to optimize the image and save it in the configured S3 bucket.

Feel free to explore the project's code to understand how the AWS Cognito functionalities, antd component library, route control, and serverless image optimization are implemented.

## Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit your code.
4. Push your changes to your forked repository.
5. Submit a pull request describing your changes.

## License

The project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [AWS Cognito](https://aws.amazon.com/cognito/)
- [AWS S3](https://aws.amazon.com/s3/)
- [antd](https://ant.design/)
- [react-router-dom](https://reactrouter.com/en/6.13.0/start/overview)
