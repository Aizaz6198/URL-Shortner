
# URL Shortener Node.js App

A simple URL shortener microservice built with Node.js, Express, and MongoDB.

## Table of Contents

- [URL Shortener Node.js App](#url-shortener-nodejs-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Usage](#usage)
    - [Start the server](#start-the-server)

## Overview

This project is a basic URL shortener microservice that allows users to shorten long URLs into more manageable and shareable links.

## Features

- Shorten long URLs
- Retrieve the original URL using the shortened version
- ...

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:

   git clone <https://github.com/your-username/url-shortener-node.git>.

2. Change into the project directory:

   cd url-shortener-node

3. Install dependencies:

  npm install

### Environment Variables

Create a .env file in the project root and add the following:

PORT=3000
MONGO_URI=mongodb+srv://your-username:<your-password@cluster0.iaiuzrt.mongodb.net>/your-database
Replace your-username, your-password, and your-database with your actual MongoDB credentials.

## Usage

### Start the server

npm start

Open your browser and visit <http://localhost:3000> to access the URL Shortener.
