# Accessibility Scanner App

A comprehensive web accessibility testing tool that scans websites for WCAG compliance issues using axe-core and Puppeteer. Built with React, Node.js, TypeScript, and MongoDB.

---

## Quick Start

### Prerequisites

- Node.js 16+
- MongoDB (local or Atlas)
- npm

### Installation

1. Clone the repository
    ```
        git clone https://github.com/oggs22/accessibility-scanner-app
        cd accessibility-scanner-app
    ```

2. Setup Backend

    ```
        cd backend
        npm install

        # Create .env file
        cp .env.example .env
    ```

3. Setup Frontend

    ```
        cd frontend
        npm install

        # Create .env file
        cp .env.example .env
    ```

4. Start Development Servers
  #### Terminal 1 - Backend:

  ```
      cd backend
      npm run dev
      # Server runs on http://localhost:5000
  ```

  #### Terminal 2 - Frontend:

  ```
      cd frontend
      npm run dev
      # Server runs on http://localhost:5173
  ```

### API Documention

- `POST /api/scan` - Create a new scan
- `GET /api/scan/:id` - Get scan details
- `GET /api/scan-list` - List all scans
- `DELETE /api/scan/:id` - Delete a scan

### Testing

#### Backend Tests

```
    cd backend
    npm test  
```

#### Frontend Tests

```
    cd frontend
    npm test
```

### Test Coverage

- **Backend**: API endpoints and scanning logic
- **Frontend**: UI components (Button, ScanForm)

### Time Investment

**Total Development Time**: ~9 hours
- **Base Project Development:**: 8 hours
- **Feature Implementation**:  1 hour (Adding the Excel download functionality)
