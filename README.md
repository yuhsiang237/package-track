# Package Track

This project is a package tracking application designed to monitor the version of a specific NPM package. It consists of a backend API to fetch package data and a web frontend to display it.

## Project Structure

- `/api`: A Python Flask server that provides an API to get the latest version of the Vue.js package.
- `/web`: A Vue.js application that consumes the API and displays the information.

---

## Backend (API)

The API is a simple Flask application that retrieves the latest version of the `vue` package from the NPM registry.

### Setup

1.  Navigate to the `api` directory:
    ```bash
    cd api
    ```
2.  Create and activate a Python virtual environment:
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```
3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### Running the API

Once the setup is complete, start the Flask server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`.

### API Endpoint

-   **GET `/api/vue/latest-version`**: Fetches the latest stable version of the `vue` package.

---

## Frontend (Web)

The frontend is a modern web application built using Vue 3 and Vite that displays the package version information retrieved from the backend.

### Setup

1.  Navigate to the `web` directory:
    ```bash
    cd web
    ```
2.  Install the necessary dependencies using Yarn:
    ```bash
    yarn install
    ```

### Development

To compile and hot-reload the application for development, run:

```bash
yarn dev
```

### Production

To type-check, compile, and minify the application for production, run:

```bash
yarn build
```
