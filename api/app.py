import requests
import configparser
import sqlite3
from datetime import datetime
from flask import Flask, jsonify

# --- Database Setup ---
DB_NAME = 'version_history.db'

def init_db():
    """Initializes the database and creates the table if it doesn't exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS version_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            package_name TEXT NOT NULL,
            version TEXT NOT NULL,
            retrieved_at TIMESTAMP NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def log_version_check(package_name, version):
    """Logs a package version check to the database if the package/version
    combination does not already exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Check if this specific version has been logged before
    cursor.execute(
        "SELECT COUNT(*) FROM version_log WHERE package_name = ? AND version = ?",
        (package_name, version)
    )
    exists = cursor.fetchone()[0]

    # If it doesn't exist, insert it
    if exists == 0:
        cursor.execute(
            "INSERT INTO version_log (package_name, version, retrieved_at) VALUES (?, ?, ?)",
            (package_name, version, datetime.now())
        )
        conn.commit()

    conn.close()

# --- Configuration ---
config = configparser.ConfigParser()
config.read('tokens.cfg')

API_BASE_URL = "https://registry.npmjs.org"

# --- Flask App Setup ---
app = Flask(__name__)

# --- Business Logic ---
def get_latest_package_version(package_name):
    """Fetches the latest version of a package from the npm registry."""
    try:
        r = requests.get(f"{API_BASE_URL}/{package_name}")
        r.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)
        data = r.json()
        latest_version = data.get('dist-tags', {}).get('latest')
        if not latest_version:
            return {"error": f"Could not parse version for {package_name} from npm registry response."}
        return {"version": latest_version}
    except requests.exceptions.RequestException as e:
        return {"error": f"Could not fetch version for {package_name} from npm registry: {e}"}

# --- API Endpoint ---
@app.route('/api/version/<path:package_name>/latest', methods=['GET'])
def package_version_api(package_name):
    """API endpoint to get the latest package version and log it."""
    result = get_latest_package_version(package_name)
    if "error" in result:
        return jsonify(result), 500
    
    # Log the successful fetch
    latest_version = result['version']
    log_version_check(package_name, latest_version)
    
    return jsonify({"package": package_name, "latest_version": latest_version})

def get_all_latest_versions_from_db():
    """
    Connects to the SQLite database and retrieves the latest version recorded
    for every package in the version_log table.
    """
    try:
        conn = sqlite3.connect(DB_NAME)
        # Return rows as dictionaries
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        query = """
            SELECT v.package_name, v.version
            FROM version_log v
            INNER JOIN (
                SELECT package_name, MAX(retrieved_at) AS max_retrieved_at
                FROM version_log
                GROUP BY package_name
            ) AS latest ON v.package_name = latest.package_name AND v.retrieved_at = latest.max_retrieved_at;
        """

        cursor.execute(query)
        results = cursor.fetchall()
        
        # Convert row objects to dictionaries
        return [dict(row) for row in results]

    except sqlite3.Error as e:
        # In a real app, you'd want better error logging
        print(f"Database error: {e}")
        return {"error": str(e)}
    finally:
        if conn:
            conn.close()

@app.route('/api/versions/latest', methods=['GET'])
def all_latest_versions_api():
    """
    API endpoint to get the latest logged versions for all packages.
    """
    versions = get_all_latest_versions_from_db()
    if "error" in versions:
        return jsonify(versions), 500
    return jsonify(versions)

# --- Main Execution ---
if __name__ == '__main__':
    init_db()  # Initialize the database on startup
    app.run(host='0.0.0.0', port=5000, debug=True)