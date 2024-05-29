## Installation Guide

### Prerequisites

- Node.js installed on your machine. You can download and install it from [Node.js official website](https://nodejs.org/en/download).

### Installation Steps

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/nukumalik/employee-onboarding-form.git
```

2. Navigate to the project directory:

```bash
cd employee-onboarding-form
```

3. Install dependencies using npm or yarn:

```bash
npm install
```

4. After the installation is complete, you can start the development server:

```bash
npm start
```

6. Open your web browser and visit http://localhost:3000 to view the application.

## Reasoning behind the approach taken

The approach taken for this app was guided by the following principles:

- Ensuring that all fields on form is appear correctly and render error when the required fields is empty

- Ensuring that when user press submit button it'll showing up the confirmation modal and when user click submit button on the confirmation modal the onboarding form will be reset/empty and the data will be store on the employee context

- Using the ant design component library to reduce the app development time and more focusing on the functionality

- Dividing the source code into some folders, like components, hooks, services, styles, types, and utils to make it easy to maintain, dividing the purpose, and to make it more clean.

Specific Strategies:

- Rendering Tests: Verify that all form fields and buttons are rendered correctly.

- Interaction Tests: Test user interactions such as filling out the form, toggling switches, and submitting the form.

- Conditional Rendering: Ensure that the email input appears when the "Give employee their own login" switch is toggled.

## Assumptions Made

- Form Structure: The form fields and structure will not change frequently, so the test queries are based on the current labels and element hierarchy.

- Mock Data: The provided mock data for organisations, departments, and divisions is representative of the actual data structure returned by the API.

## Total Time Taken

The total time taken to develop and refine the tests, including resolving errors and ensuring robustness, was approximately 4 hours. This time includes:

- Writing codes and refining the test cases: 3 hours

- Debugging and resolving issues: 0.5 hours

- Docummenting the app on Readme file: 0.5 hours

## Solutions Relied on Googling

During the development of these tests, some solutions and approaches were researched using Google. Specifically:

- React Testing Library Queries: Understanding the best practices for using getByLabelText, getByRole, and other queries.

- Mocking Axios: Research on how to effectively mock axios.

- Handling Ant Design Components: Finding tips on testing components from Ant Design, especially for more complex components like Upload, and Form.
