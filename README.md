# Drizzle Nextjs Tutorial

## Overview

This project is for my full drizzle course tutorial on my youtube channel [@codegenix](https://youtube.com/@codegenix).This is a multi author blog website. It utilizes Next.js, typescript, drizzle orm and postgres. Follow the instructions below to set up the project and get it running locally.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20.15.x or higher)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Installation

#### Option 1: Cloning the Frontend Branch

If you want to follow the tutorial:

1. Clone the `frontend` branch of the repository:
   ```bash
   git clone -b frontend https://github.com/codegenixdev/drizzle-nextjs-tutorial.git
   ```
2. Navigate to the project directory:
   ```bash
   cd drizzle-nextjs-tutorial
   ```

#### Option 2: Cloning the Master Branch

If you want to set up the full project:

1. Clone the repository:
   ```bash
   git clone https://github.com/codegenixdev/drizzle-nextjs-tutorial.git
   ```
2. Navigate to the project directory:
   ```bash
   cd drizzle-nextjs-tutorial
   ```

### Setting up the environment variables:

```bash
cp .env.sample .env
```

### Setting Up the Database

1. Use Docker Compose to set up the PostgreSQL server:
   ```bash
   docker-compose up
   ```

### Installing Dependencies

1. Install the necessary Node.js packages:
   ```bash
   npm install
   ```

### Running the Project

1. Start the development server:
   ```bash
   npm run dev
   ```

### Accessing the Project

- Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the application running.

For any questions or feedback, check my youtube channel [youtube.com/@codegenix](https://youtube.com/@codegenix).
