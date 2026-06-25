⚖️ Law Connect

A modern, full-stack Lawyer Hiring Platform built with Next.js and a powerful backend API. Law Connect makes it easy for clients to discover lawyers, send hire requests, manage consultations, and handle secure interactions — all in one seamless platform.

🌐 Live Demo: https://law-connect-client.vercel.app/

✨ Features
🔍 Find Lawyers Easily – Browse and search verified lawyers by category and expertise
📩 Hire Requests System – Send and manage lawyer hiring requests
👨‍⚖️ Lawyer Dashboard – Manage services, requests, and client interactions
👤 Client Dashboard – Track hired lawyers and requests status
💳 Secure Payments Integration – Stripe-ready payment flow for consultations
📊 Analytics Dashboard – Visual insights with charts and stats
🧾 Transaction Management – Track payments and service history
🔐 Authentication System – Secure login/signup with JWT/session support
📱 Responsive UI – Fully mobile-friendly modern design
⚡ Fast Performance – Built on Next.js with optimized rendering
🛠️ Tech Stack

Frontend:

Next.js (App Router)
React.js
Tailwind CSS
HeroUI
React Icons

Backend:

Node.js
Express.js
MongoDB

Authentication:

JWT / Session-based Auth

Payments:

Stripe Integration

Deployment:

Vercel (Frontend)
Backend Hosted Separately
📁 Project Structure
law-connect-client/
│
├── app/                # Next.js app routes
├── components/         # Reusable UI components
├── lib/                # Utilities & API handlers
├── hooks/              # Custom React hooks
├── styles/             # Global styles
└── public/             # Static assets
🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/law-connect.git
cd law-connect
2. Install dependencies
npm install
3. Setup environment variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
JWT_SECRET=your_jwt_secret
4. Run the development server
npm run dev

App will run at:

http://localhost:3000
📸 Screenshots

Add screenshots here (recommended)

Home Page
Lawyer Listing Page
Dashboard
Hire Request Flow
🔐 Core Modules
👨‍⚖️ Lawyer System
Profile creation
Service listing
Request acceptance/rejection
👤 Client System
Lawyer search
Hire request tracking
Payment handling
📊 Admin/Analytics
Revenue tracking
User insights
Transaction logs
📦 API Features
/api/auth/* – Authentication
/api/lawyers/* – Lawyer management
/api/hire/* – Hire request system
/api/payments/* – Stripe payments
/api/analytics/* – Dashboard data
🌟 Future Improvements
Live chat between client & lawyer 💬
Video consultation integration 🎥
AI-powered lawyer recommendation 🤖
Multi-language support 🌍
Mobile app (React Native) 📱
👨‍💻 Author

Ariyan Rintu
Full-Stack Developer | React & Next.js Enthusiast

📄 License

This project is licensed under the MIT License.