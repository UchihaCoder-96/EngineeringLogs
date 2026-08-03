# EngineeringLogs

EngineeringLogs is a full-stack web application for showcasing engineering projects and maintaining a technical journal. It features a secure admin dashboard for content management, Markdown-powered articles, and a modern responsive interface.

## ✨ Features

- 🔐 JWT Authentication
- 📝 Create, edit, and delete Projects & Journals
- 📖 Markdown support
- 💻 Syntax highlighting for code blocks
- 📐 LaTeX math rendering
- 👁️ View counter for articles
- 🔍 SEO & Open Graph metadata
- 📱 Responsive design
- ⚡ Fast ASP.NET Core + Next.js architecture

## 🛠️ Tech Stack

### Backend
- ASP.NET Core 10
- Entity Framework Core
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- React Markdown
- KaTeX
- Highlight.js

## 🚀 Running Locally

### Backend

```bash
cd backend/EngineeringLogs.Api
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on **http://localhost:3000** and communicates with the ASP.NET Core API.

## 📸 Screenshots

> Screenshots coming soon.

## 🔮 Future Plans

- Search functionality
- Tags & categories
- Rich Markdown editor
- Image uploads
- Analytics dashboard
- Article recommendations

## 📄 License

This project is open source and available under the MIT License.