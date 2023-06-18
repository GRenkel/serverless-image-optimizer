# AWS Cognito UI

This repository contains a user interface (UI) implementation for user management features using AWS Cognito. The project utilizes the antd library as a component library for building the UI. The implemented functionalities include user creation, login, session control, and password recovery using AWS Cognito.

## Prerequisites

Before running the project, make sure you have completed the following steps:

1. Set up an AWS Cognito user pool in your AWS account.
2. Obtain the User Pool ID and the Client ID for your Cognito user pool.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/GRenkel/aws-cognito-ui.git
   ```

2. Navigate to the project directory:

   ```
   cd aws-cognito-ui
   ```

3. Create a `.env` file in the root directory of the project.

4. Open the `.env` file and add the following environment variables:

   ```
   REACT_APP_USERPOOL_ID=<your-userpool-id>
   REACT_APP_CLIENT_ID=<your-client-id>
   ```

   Replace `<your-userpool-id>` and `<your-client-id>` with the actual values for your AWS Cognito user pool.

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
- Password recovery: Enable users to request a new password if forgotten.

Feel free to explore the project's code to understand how the AWS Cognito functionalities are implemented using the antd component library.

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
- [antd](https://ant.design/)