# Eco Power Hub

EcoPowerHub is a web application for managing renewable energy solutions and power systems. This project represents the frontend implementation built with Angular.

## Features

- User authentication and authorization
- Company and product management
- Order processing and tracking
- User profile management
- Support ticket system
- Admin dashboard

## Prerequisites

- Node.js (v14 or higher)
- Angular CLI 19.0.4
- NPM (Node Package Manager)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Eco-PowerHub/Front-end.git
cd Front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

## Project Structure

```
src/
├── app/
│   ├── auth/        # Authentication services and components
│   ├── components/  # Shared components
│   ├── services/    # Application services
│   └── models/      # Data models and interfaces
├── assets/          # Static files
└── environments/    # Environment configurations
```

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The project includes configurations for:
- Docker containerization (see `Dockerfile`)
- Kubernetes deployment (see `Kubernetes/` directory)
- Nginx configuration (see `Nginx/nginx.conf`)

## Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

## API Integration

The application integrates with a RESTful API providing:
- User authentication
- Product management
- Order processing
- Company management
- Support ticket system
