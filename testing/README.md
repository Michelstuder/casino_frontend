# Frontend Testing Documentation

## 1. Test Environment Setup

### Hardware Requirements
- **CPU**: Dual-core processor or higher
- **RAM**: 4GB or higher
- **Storage**: 500MB available disk space

### Software Requirements
- **Operating System**: Windows 10 or higher, macOS, or a Linux distribution
- **Browser**: Latest versions of Google Chrome, Mozilla Firefox, or Safari
- **Node.js**: Version 14 or higher
- **yarn**: Version 1.22.22 or higher

### Dependencies
Install dependencies using the following command:
```bash
yarn
```

---

### Starting the Application
To run the application locally:
```bash
yarn start
```

---

## 2. Test Cases

| **ID** | **Component** | **Test Description**                                             | **Expected Result**                                                                                   |
|--------|---------------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| TC-01  | Navbar        | Display of the user's balance in the navbar                      | User's balance is correctly displayed when logged in                                                  |
| TC-02  | Navbar        | Toggle dropdown for user actions (Profile, Logout)               | Dropdown opens/closes as expected when clicking on the user icon                                      |
| TC-03  | Navbar        | Dropdown close on clicking outside                               | Dropdown closes when user clicks outside the dropdown                                                 |
| TC-04  | Toast Notifications | Display of success toast on balance update                    | Success toast with message "Balance updated successfully" is displayed at the top-right corner         |
| TC-05  | Toast Notifications | Display of error toast on failed action                        | Error toast is displayed when an invalid operation (e.g., negative deposit) is attempted               |
| TC-06  | Home          | Display of current balance                                       | User's balance is displayed in the center of the page upon loading                                    |
| TC-07  | Home          | Deposit action updates balance                                   | Balance updates when a valid deposit amount is entered, and success toast appears                      |
| TC-08  | Home          | Withdrawal action updates balance                                | Balance updates when a valid withdrawal amount is entered, and success toast appears                   |
| TC-09  | Home          | Error handling for invalid deposit amount                        | Error toast is displayed when a negative or zero deposit amount is entered                             |
| TC-10  | Home          | Error handling for invalid withdrawal amount                     | Error toast is displayed when a negative or zero withdrawal amount is entered                          |
| TC-11  | Home          | Placeholder text visibility in deposit and withdrawal inputs     | Placeholders in the input fields are fully visible and not cut off                                    |
| TC-12  | Toast Notifications | Toast notifications do not interfere with dropdown functionality | Dropdown menu operates independently of toast notifications, with no overlap or event conflicts        |
| TC-13  | Routing       | Redirect to login if user is not authenticated                   | User is redirected to the login page if they attempt to access a protected route without authentication |
| TC-14  | Google Login  | Google Login button is displayed when user is not logged in      | Google Login button is visible and functional on the login page                                       |
| TC-15  | Google Login  | Successful login updates isLoggedIn state and displays balance   | Upon successful login, `isLoggedIn` is set to true, and the user's balance is displayed                |

---

## 3. Test Protocol

The following table shows the results of executing each test case. All tests have been marked as passed.

| **ID** | **Component** | **Test Description**                                             | **Result** |
|--------|---------------|-------------------------------------------------------------------|------------|
| TC-01  | Navbar        | Display of the user's balance in the navbar                      | Passed     |
| TC-02  | Navbar        | Toggle dropdown for user actions (Profile, Logout)               | Passed     |
| TC-03  | Navbar        | Dropdown close on clicking outside                               | Passed     |
| TC-04  | Toast Notifications | Display of success toast on balance update                    | Passed     |
| TC-05  | Toast Notifications | Display of error toast on failed action                        | Passed     |
| TC-06  | Home          | Display of current balance                                       | Passed     |
| TC-07  | Home          | Deposit action updates balance                                   | Passed     |
| TC-08  | Home          | Withdrawal action updates balance                                | Passed     |
| TC-09  | Home          | Error handling for invalid deposit amount                        | Passed     |
| TC-10  | Home          | Error handling for invalid withdrawal amount                     | Passed     |
| TC-11  | Home          | Placeholder text visibility in deposit and withdrawal inputs     | Passed     |
| TC-12  | Toast Notifications | Toast notifications do not interfere with dropdown functionality | Passed     |
| TC-13  | Routing       | Redirect to login if user is not authenticated                   | Passed     |
| TC-14  | Google Login  | Google Login button is displayed when user is not logged in      | Passed     |
| TC-15  | Google Login  | Successful login updates isLoggedIn state and displays balance   | Passed     |

## 4. Unit tests

I implemented simple playwright unit tests using playwright. The unit tests cover these three major components:
- **App.tsx**
- **Home.tsx**
- **Roulette.tsx**

I decided to only cover these components, since testing more would be an overkill for frontend unit tests.
