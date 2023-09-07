# BloodY

### it's an MVP (Minimum Viable Product)

## Table of Contents
- [BloodY](#bloody)
    - [it's an MVP (Minimum Viable Product)](#its-an-mvp-minimum-viable-product)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Authentication](#authentication)

## Introduction

The "Bloody" API is a backend project designed to manage blood donation and distribution services. It provides a platform for donors to register, hospitals to request blood, and admins to manage the system efficiently. This README provides essential information to get you started with the API.

## Features

- User Registration and Authentication
- Blood Donor Management
- Blood Request and Allocation
- Admin Dashboard for System Management
- RESTful API for easy integration with frontend applications

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js 
- MYSQL 
- npm or Yarn package manager
- Git (optional, for cloning the repository)

### Installation

1. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/mohamedelbadawi/Bloody.git
    ```
    Navigate to the project directory:

   ```bash
   cd bloody
   ```
   Install dependencies:
   ```bash
    npm install
    
    # or
    
    yarn install
   ```
   Create a .env file in the root directory and configure your environment variables, including database connection details, secret keys, etc.

   Start the server:
   ```bash
    npm start

    # or
    
    yarn start
   ```

   The API should now be running locally. You can access it at http://localhost:4000.

   ### Usage
    To use the API, you can make HTTP requests to the provided endpoints. Detailed documentation on API endpoints and usage can be found in the API Endpoints section below.

   ### Authentication
    The API uses JSON Web Tokens (JWT) for authentication. You will need to obtain an API key or token by registering and logging in as a user. Include this token in the Authorization header of your requests for secure access to protected routes.


    ## Blood Donation Request
    One of the key features of this API is the ability for users to request a blood donation with a specific blood type. When a user submits a blood donation request, the following process occurs:

    1-The user submits a request with the desired blood type and location (city).

    2-The API sends an email notification to all registered users with the same blood type and who live in the same city, providing details about the blood donation request.

    3-If a donor accepts the request, the requester receives an email with the contact information of the donor.

    This feature helps connect those in need of blood with potential donors quickly and efficiently.