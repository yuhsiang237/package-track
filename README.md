# Package Track

A frontend package version tracking tool that helps teams quickly monitor dependency status and update dynamics.

## Introduction

In current team development workflows, frontend engineers need to manually check package version updates, leading to fragmented and time-consuming processes that cause:

- Difficulty keeping track of major updates (e.g., React, Vue3, Next.js, SASS, Angular, etc.)
- Lack of unified version viewing mechanism, causing potential security and compatibility issues from outdated packages

To solve these problems, we have designed a "Frontend Package Version Tracking Tool" to help teams quickly grasp the status of dependency packages.

## Key Features

### Centralized Package Viewing

- Unified display of all project dependency package version information
- Support for importing package.json files in various formats
- Clear interface showing current and latest versions

### Real-time Update Tracking

- Automatic checking of available package updates
- Detailed version difference information
- Filtering and sorting functionality to quickly find packages needing updates

### Enhanced Security and Compatibility

- Security warning information display
- Compatibility issue identification from outdated versions
- Update recommendations and best practices

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - Vue.js Framework
- **UI**: Custom Vue components + Popper.js tooltips
- **Styling**: SASS/SCSS
- **API**: NPM Registry API
- **Deployment**: GitHub Pages (Static Site)

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
# npm
npm install
```

### Development Mode

Start the development server at `http://localhost:3000`:

```bash
# npm
npm run dev
```

### Production Deployment

Build the application for production:

# Static Version

```bash
# npm
npm run generate
```

# SSR Server-side Rendered Version

```bash
# npm
npm run build
```

Local preview of production build:

```bash
# npm
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
package-track/
├── app/
│   ├── api/           # API endpoints
│   ├── components/    # Vue components
│   ├── models/        # Data models
│   ├── pages/         # Page components
│   └── layouts/       # Layout components
├── public/            # Static assets
├── .nuxt/            # Nuxt generated files
└── .output/          # Build output
```

## Main Pages

- **Home** (`/`) - Main dashboard displaying package status overview
- **Settings** (`/setting`) - Manage package list and settings
- **Info** (`/info`) - Project documentation and usage guide

## Development Commands

```bash
# Development mode
npm run dev

# Code formatting
npm run format

# ESLint checking
npm run lint

# Build
npm run build

# Preview
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Design & Development

YU-HSIANG
