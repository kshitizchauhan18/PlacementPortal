# 🎓 Placement Portal

A comprehensive full-stack placement management system that connects students with job opportunities. Companies can post job openings while students can browse positions and submit applications through an intuitive interface with role-based dashboards.

## ✨ Features

### For Students
- 📝 Browse available job postings from various companies
- 🔍 View detailed job descriptions and requirements
- 📤 Submit applications to multiple positions
- 📊 Track application status through personalized dashboard
- 👤 User profile management

### For Companies
- 📋 Post new job openings with detailed requirements
- 👥 Manage and view all posted positions
- 📥 Review student applications
- 🎯 Track applicant information
- 📈 Company dashboard for recruitment management

### General
- 🔐 Secure authentication and authorization
- 🎨 Responsive React-based user interface
- 🔄 RESTful API architecture
- 💾 Persistent data storage with MySQL

## 🛠️ Tech Stack

**Backend:**
- Spring Boot 3.5.0
- Java 21
- Spring Data JPA
- MySQL Database
- RESTful APIs

**Frontend:**
- React 19.1.0
- React Router DOM 7.6.2
- Axios for API calls
- Modern CSS styling

**Build Tools:**
- Maven (Backend)
- npm (Frontend)

## 📋 Prerequisites

Before running this project, make sure you have:
- Java 21 or higher
- Node.js 16+ and npm
- MySQL 8.0+
- Maven 3.6+

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kshitizchauhan18/PlacementPortal.git
cd PlacementPortal
```

### 2. Database Setup
```sql
CREATE DATABASE placementdb;
```

### 3. Configure Application Properties
Update `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placementdb
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### 4. Backend Setup
```bash
# Install dependencies and build
./mvnw clean install

# Run the Spring Boot application
./mvnw spring-boot:run
```
The backend server will start on `http://localhost:8080`

### 5. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
PlacementPortal/
├── src/main/java/com/kshitiz/placementportal/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST API controllers
│   ├── dto/            # Data Transfer Objects
│   ├── model/          # Entity models
│   ├── repository/     # Data access layer
│   └── service/        # Business logic layer
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # React components
│       ├── pages/      # Page components
│       └── api.js      # API integration
├── pom.xml             # Maven configuration
└── README.md
```

## 🔌 API Endpoints

### User Management
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user details

### Job Postings
- `GET /api/jobs` - Get all job postings
- `GET /api/jobs/{id}` - Get specific job details
- `POST /api/jobs` - Create new job posting (Company)
- `GET /api/jobs/company/{companyId}` - Get jobs by company

### Applications
- `POST /api/applications` - Submit job application
- `GET /api/applications/user/{userId}` - Get user's applications
- `GET /api/applications/job/{jobId}` - Get applications for a job

## 🎯 Usage

1. **Register** as either a Student or Company
2. **Login** with your credentials
3. **Students**: Browse jobs and submit applications
4. **Companies**: Post jobs and review applications
5. **Track** everything through your personalized dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Kshitiz Chauhan**
- GitHub: [@kshitizchauhan18](https://github.com/kshitizchauhan18)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- MySQL Community

---

⭐ Star this repository if you find it helpful!
