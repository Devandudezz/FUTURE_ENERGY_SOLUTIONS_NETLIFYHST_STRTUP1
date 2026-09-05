# FOX EYE INTERNATIONAL - Detective Agency Website 🕵️‍♂️

> A professional detective agency website built for a client, a detective firm using SMTP, Nodemailer, serverless deployment, and modern web hosting.
> 
This project represents a real-world learning journey combining AI-assisted development with hands-on implementation.

- ✅ Fully functional detective agency website with 3 pages
- ✅ Secure contact form with automated email notifications
- ✅ Dark/light mode toggle with theme persistence
- ✅ Responsive design for all devices
- ✅ Netlify serverless deployment ready with custom domain support
- ✅ Professional branding and UI/UX


SMTP & Email Delivery

- Configured Nodemailer with Gmail, SendGrid, and custom SMTP
- Understood SMTP authentication, ports (587 vs 465), and TLS/SSH
- Implemented email retry logic and error handling
- Solved CORS issues with cloudflare tunnels and email delivery
- Set up dual email notifications (agency + client confirmation)
- Debugged SMTP connection failures and timeouts

Node.js & Backend Development
- Built Express server from scratch for local development
- Understood middleware (CORS, JSON parsing)
- Created REST API endpoints for form submission
- Implemented request validation and error responses
- Learned about environment variables and .env configuration
- Transitioned from traditional server to serverless architecture

Serverless & Netlify Functions
- Converted Express server to Netlify Functions (AWS Lambda)
- Understood event-driven architecture
- Learned deployment strategies for serverless
- Implemented CORS handling in serverless context
- Configured `netlify.toml` for proper builds
- Set up environment variables in production environment.
  
Web Hosting & Deployment
- Netlify: From GitHub repo to live site with one click
- Custom Domains: DNS configuration at registrar level,used Hostinger.
- HTTPS/SSL Automatic certificate provisioning
- CDN:Global content delivery and caching
- Build Pipeline:Automated builds on git push
- Environment Separation:Development vs Production

Frontend Development
- Vanilla JavaScript (no frameworks - pure DOM manipulation)
- CSS variables for theming (dark/light mode)
- localStorage for user preferences
- Event listeners and form handling
- Responsive design with mobile-first approach
- Intersection Observer for animations

Security Best Practices
- Environment variables in production only
- CORS configuration for specific origins
- Input validation on forms
- Email format validation
- HTTPS enforcement

DevOps & Git Workflow
- Git initialization and repository setup
- `.gitignore` configuration
- GitHub repository management
- CI/CD pipeline understanding
- Build logs and deployment troubleshooting


Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Variables, responsive design, grid/flexbox
- **Vanilla JavaScript** - DOM manipulation, event handling, localStorage

### Backend (Local Development)
- **Node.js** - Server runtime
- **Express** - HTTP server framework
- **Nodemailer** - Email delivery library

### Backend (Production)
- **Netlify Functions** - Serverless AWS Lambda functions
- **Nodemailer** - Same library, different environment

### Email Delivery
- **Gmail SMTP** - With App Passwords
- **SendGrid** - REST API (alternative)
- **Custom SMTP** - Any provider

### Hosting & Deployment
- **GitHub** - Version control & repository
- **Netlify** - Hosting, Functions, and SSL
- **Custom DNS** - Domain configuration at registrar

### Tools & Platforms
- **Git** - Version control basics
- **npm** - Package management
- **DevTools** - Debugging and network inspection
- **Environment Variables** - Configuration management

 Support & Resources

**Email/SMTP:**
- Gmail: https://myaccount.google.com/apppasswords
- SendGrid: https://sendgrid.com/
- Nodemailer: https://nodemailer.com/

**Hosting:**
- Netlify: https://netlify.com/
- Netlify Functions: https://docs.netlify.com/functions/overview/
- DNS Records: https://dnschecker.org/

**Version Control:**
- Git: https://git-scm.com/
- GitHub: https://github.com/

