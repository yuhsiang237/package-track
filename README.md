# NPM Package Version Tracker

A backend service developed with Python and Flask to track the latest versions of NPM packages.

This application connects to the NPM registry to fetch the latest version number of a specific package and stores the query history in a SQLite database.

## ✨ Features

*   **Real-time Version Query**: Look up the latest version of any NPM package via an API.
*   **Version History Logging**: Automatically logs the package and version number of each successful query to the database.
*   **Retrieve All Records**: Provides an API endpoint to get the latest recorded version for all tracked packages from the database.
*   **Lightweight Design**: Built with Flask and SQLite for simple deployment and low resource consumption.

## 🛠️ Technology Stack

*   **Backend**: Python, Flask
*   **HTTP Client**: requests
*   **Database**: SQLite

## 🚀 Getting Started

### Prerequisites

*   Python 3.x
*   pip

### Installation & Setup

1.  **Navigate to the `api` directory:**
    ```bash
    cd api
    ```

2.  **Create and activate a virtual environment:**
    *   Create: `python -m venv venv`
    *   Activate (Windows): `.\venv\Scripts\activate`
    *   Activate (macOS/Linux): `source venv/bin/activate`

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **(Optional) Configure settings:**
    The `tokens.cfg` file is not currently used in the code, but it can be configured for future extensions.
    ```bash
    # Copy the example file
    cp tokens.cfg.example tokens.cfg
    ```

5.  **Initialize the database and run the application:**
    ```bash
    python app.py
    ```
    The service will start on `localhost` at port `5000` and automatically create the `version_history.db` database file.

## <caption> API Endpoints

### 1. Get the Latest Version of a Specific Package

Fetches the latest version of a specific NPM package and saves the result to the database.

*   **URL**: `/api/version/<package_name>/latest`
*   **Method**: `GET`
*   **Example**: Get the latest version of `react`.
    ```bash
    curl http://127.0.0.1:5000/api/version/react/latest
    ```
    For scoped packages (e.g., `@angular/core`):
    ```bash
    curl http://127.0.0.1:5000/api/version/@angular/core/latest
    ```

*   **Success Response**:
    ```json
    {
      "package": "react",
      "latest_version": "18.3.1"
    }
    ```

### 2. Get Latest Records for All Tracked Packages

Retrieves the last recorded version for all packages that have been queried from the database.

*   **URL**: `/api/versions/latest`
*   **Method**: `GET`
*   **Example**:
    ```bash
    curl http://127.0.0.1:5000/api/versions/latest
    ```

*   **Success Response**:
    ```json
    [
      {
        "package_name": "react",
        "version": "18.3.1"
      },
      {
        "package_name": "vue",
        "version": "3.4.27"
      }
    ]
    ```

## 📄 License

The license for this project can be found in the `api/LICENSE` file.