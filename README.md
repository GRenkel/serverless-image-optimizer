# Serverless Image Optimizater

This repository contains a serverless architecture for image optimization using AWS S3, AWS Cognito, AWS API Gateway and AWS Lambda functions. The project provides functionalities for user management, including user creation, login, session control, and password recovery using AWS Cognito. Additionally, it implements image optimization by leveraging Lambda functions to automatically optimize and save images in an S3 bucket.

## AWS Architecture
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-diagram.png)

## Application Images

#### Upload Screen
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-ui.png)
#### Optimizing Image
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-ui-optimizing.png)
#### Loading Skeletons
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-ui-skeleton.png)
#### Login Screen
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-login.png)
#### Sign Up Screen
![Alt Text](https://github.com/GRenkel/serverless-image-optimizer/blob/f332b40c27f316f87962d07e6ff7e3c9c926e24f/app-showcase/application-signup.png)

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
