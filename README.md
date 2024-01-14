# Cryptocurrency Dashboard React Project

## Overview

Welcome to the Cryptocurrency Dashboard React project! This application provides a comprehensive dashboard for tracking and analyzing cryptocurrency data. Users can search for specific coins, switch between different currencies, view interactive charts, and stay updated on trending coins. The project is built using React, Tailwind CSS, Chart.js, and Redux for state management.

## Features

### 1. Coin Search

The application allows users to search for specific cryptocurrencies. The search functionality is intuitive, providing real-time suggestions as users type, making it easy to find the desired coin.

### 2. Currency Switching

Users can switch between different currencies to view cryptocurrency prices and statistics in their preferred currency. This feature enhances user flexibility and accessibility.

### 3. Interactive Charts

The project integrates Chart.js to display interactive and visually appealing charts for cryptocurrency data. Users can customize the time range and compare multiple currencies on the same chart for in-depth analysis.

### 4. Trending Coins

The dashboard features a section highlighting trending coins, providing users with insights into the market's current dynamics. This feature aids users in staying informed about the latest trends.

## Technologies Used

- **React:** The project is built using the React library, enabling the creation of interactive and dynamic user interfaces.

- **Tailwind CSS:** Tailwind is used for styling the application, providing a utility-first CSS framework for rapid development.

- **Chart.js:** The Chart.js library is employed to create interactive and visually appealing charts for displaying cryptocurrency data.

- **React Redux:** Redux is utilized for state management, ensuring a predictable and centralized state for the entire application.

## Folder Structure

```plaintext
- src
  - components
    - common
      - Header.tsx
      - Icons.tsx
      - Search.tsx
    - constants
      - constants.ts
      - userdata.ts
    - dashboard
      - chart
         - ChartBar.tsx
         - ChartData.tsx
         - CryptCurrencyDropDown.tsx
      - Dashboard.tsx
      - ExchangeCoin.tsx
      - MarketCap.tsx
      - Portfolio.tsx
   - types.ts
  - store
    - slices
      - apiResponse.ts
      - coinSelected.ts
      - dropdownSlice.ts
   - index.ts
    - utils
      - fetch.ts
  - App.tsx
  - index.tsx
  - index.css
- public
  - index.html
  - assets
- .gitignore
- package.json
- README.md
```

## Project Structure Explanation

- **src/components:** Contains React components responsible for different features such as CoinSearch, CurrencySwitch, Charts, and TrendingCoins.

- **src/store:** Houses the Redux implementation, including actions, reducers, and the store.

- **src/App.tsx:** The main component where the application is initialized.

- **src/index.tsx:** The entry point of the application.

- **public/index.html:** The HTML file that serves as the main template for the application.

- **.gitignore:** Specifies files and directories to be ignored by version control.

- **package.json:** Includes project metadata, dependencies, and scripts.

- **README.md:** The documentation file you are currently reading.

## Contributing

We welcome contributions! Please follow these guidelines:

- Report issues using the GitHub issue tracker.
- Fork the repository, make your changes, and submit a pull request.
- Follow coding standards and conventions in the project.
