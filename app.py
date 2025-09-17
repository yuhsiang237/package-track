import requests, json
import configparser
import requests
from flask import Flask, jsonify


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
@app.route('/api/version/<package_name>/latest', methods=['GET'])
def package_version_api(package_name):
    """API endpoint to get the latest package version."""
    result = get_latest_package_version(package_name)
    if "error" in result:
        return jsonify(result), 500
    return jsonify({"package": package_name, "latest_version": result['version']})

# --- Main Execution ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
