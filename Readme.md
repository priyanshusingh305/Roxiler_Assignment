
## Transaction Dashboard Project
[Demo](https://youtu.be/F6DNcFvp0Bg)

This project is built using Next.js, PNPM, and Express. It provides a transaction dashboard with various functionalities such as listing transactions, generating statistics, and displaying charts.

### Table of Contents

- [Transaction Dashboard Project](#transaction-dashboard-project)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [API Endpoints](#api-endpoints)
  - [Client-side Code](#client-side-code)
  - [Server-side Code](#server-side-code)
  - [Dependencies](#dependencies)

### Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Make sure you have Node.js and PNPM installed.
3. Navigate to the project directory and run `pnpm install` to install the dependencies.
4. Configure your environment variables as needed.
5. Start the development server using `pnpm dev`.

### Usage

Once the development server is running, you can access the transaction dashboard through your browser. The dashboard allows you to view transactions, filter data by month, search for specific transactions, and navigate through pages.

### Project Structure

The project structure is organized as follows:

- **/client**: Contains the client-side code written in React using Next.js.
- **/server**: Contains the server-side code written in Express.
- **/controllers**: Contains controller functions for handling API requests.
- **/models**: Contains the Mongoose schema for the Transaction model.
- **/services**: Contains service functions for processing data.
- **/public**: Contains public assets such as images.
- **/README.md**: This file documenting the project.
- **/pnpm-lock.yaml**: PNPM lock file.
- **/package.json**: Project metadata and dependencies.

### API Endpoints

The server provides the following API endpoints:

- `/api/transactions`: Get a list of transactions.
- `/api/statistics`: Get statistics for transactions.
- `/api/bar-chart`: Get data for a bar chart.
- `/api/pie-chart`: Get data for a pie chart.
- `/api/combined-data`: Get combined data including transactions, statistics, bar chart, and pie chart.

### Client-side Code

The client-side code is built using React and Next.js. It includes components for displaying transactions, filtering data, and visualizing statistics using charts.

- **TransactionPage**: Main component for rendering the transaction dashboard.
- **BarChartStat**: Component for displaying a bar chart.

### Server-side Code

The server-side code is built using Express. It handles API requests from the client and interacts with the database (MongoDB) using Mongoose.

- **transactionController**: Contains controller functions for handling API requests related to transactions.
- **transactionServices**: Contains service functions for processing transaction data.
- **Transaction**: Mongoose schema for the Transaction model.

### Dependencies

- **Next.js**: React framework for building client-side applications.
- **Express**: Node.js framework for building server-side applications.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Recharts**: Library for creating charts in React applications.
- **Axios**: HTTP client for making API requests.
- **PNPM**: Package manager for Node.js projects.

---
