# Updevted

A dynamic React application that curates tech news, GitHub trends, and career insights from public APIs. Designed with a modern, responsive interface and enhanced user experience features.

## Features

- Tech news and articles from various sources
- GitHub trending repositories
- Career roadmaps for tech professionals
- AI Assistant for content summarization, code explanation, and tech comparisons
- Bookmark system for saving interesting content
- Dark mode support
- Responsive design for mobile and desktop

## Stack

- React.js frontend
- Tailwind CSS
- TypeScript
- Public API integrations
- Offline support capabilities
- Mobile-first responsive design

## Deployment Instructions for Render

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add the following environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will automatically assign a port to the `PORT` environment variable)
   - `GROQ_API_KEY`: Your Groq API key
   - `DATABASE_URL`: Your PostgreSQL database URL

### Automatic Deployment with Blueprint

This repository includes a `render.yaml` configuration that allows for automatic deployment.

1. Fork this repository
2. Go to the Render Dashboard
3. Click on "Blueprint" in the top navigation
4. Connect to your forked repository
5. Render will automatically create the required services
6. Add your secrets (GROQ_API_KEY, DATABASE_URL) in the Render dashboard

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   - `GROQ_API_KEY`: Your Groq API key
   - `DATABASE_URL`: Your PostgreSQL database URL
4. Start the development server: `npm run dev`
5. The application will be available at http://localhost:5000

## Environment Variables

- `NODE_ENV`: Set to `production` for production, `development` for development
- `PORT`: The port to run the server on (defaults to 5000 if not specified)
- `GROQ_API_KEY`: API key for Groq AI services
- `DATABASE_URL`: PostgreSQL database connection string