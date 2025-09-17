# NPM Package Version API

A simple Flask API to get the latest version of the Vue.js package from the npm registry.

## Quick Start

1.  **Install:**
    ```bash
    python -m venv venv
    . venv/Scripts/activate
    pip install -r requirements.txt
    ```
    
2.  **Start:**
    ```bash
    python app.py
    ```

Once started, the API will be running at `http://localhost:5000`.

## API Endpoint

`GET /api/vue/latest-version`

Retrieves the latest stable version of the Vue.js package.

**Success Response (200 OK):**
```json
{
  "package": "vue",
  "latest_version": "3.4.27"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "error": "Could not fetch version from npm registry: ..."
}
```
