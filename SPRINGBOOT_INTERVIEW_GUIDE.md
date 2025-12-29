# 🎯 Spring Boot Interview Preparation Guide
## Based on Your Placement Portal Project

---

## 📚 Table of Contents
1. [Your Project Overview](#your-project-overview)
2. [Core Spring Boot Concepts](#core-spring-boot-concepts)
3. [Your Project Deep Dive](#your-project-deep-dive)
4. [Common Interview Questions](#common-interview-questions)
5. [Hands-on Exercises](#hands-on-exercises)
6. [What to Say in Interviews](#what-to-say-in-interviews)

---

## 🚀 Your Project Overview

**Project**: Placement Portal  
**Tech Stack**: Spring Boot 3.5.0 + MySQL + React  
**Java Version**: 21

### What Your Project Does:
- **User Management**: Students and Companies can register/login
- **Job Posting**: Companies can post job opportunities
- **Applications**: Students can apply for jobs
- **Eligibility Checking**: Jobs have criteria (CGPA, 10th/12th percentages)

### Key Features You Built:
✅ RESTful APIs  
✅ MySQL Database Integration  
✅ JPA/Hibernate ORM  
✅ CORS Configuration  
✅ 3-Layer Architecture (Controller → Repository → Model)

---

## 📖 Core Spring Boot Concepts (Must Know!)

### 1. **What is Spring Boot?**
**Simple Answer**: Spring Boot is a framework that makes it easy to create production-ready Spring applications with minimal configuration.

**Your Project Context**: 
```java
@SpringBootApplication
public class PlacementportalApplication {
    public static void main(String[] args) {
        SpringApplication.run(PlacementportalApplication.class, args);
    }
}
```

**Interview Explanation**:
- "Spring Boot eliminates boilerplate configuration"
- "In my project, I just added dependencies in pom.xml and Spring Boot auto-configured everything"
- "It includes an embedded Tomcat server, so no need to deploy WAR files"

---

### 2. **@SpringBootApplication Annotation**

This ONE annotation does THREE things:

```java
@SpringBootApplication = 
    @Configuration +           // Makes class a source of bean definitions
    @EnableAutoConfiguration + // Automatically configures Spring based on dependencies
    @ComponentScan            // Scans for components in current package and sub-packages
```

**Interview Question**: "What does @SpringBootApplication do?"
**Your Answer**: "In my placement portal, @SpringBootApplication on the main class enables component scanning, auto-configuration, and allows defining beans. It scans all packages under com.kshitiz.placementportal to find my controllers, repositories, and models."

---

### 3. **Dependency Injection & Inversion of Control (IoC)**

**What You Used in Your Project**:
```java
@RestController
public class UserController {
    @Autowired
    private AppUserRepository userRepository;
}
```

**Key Concepts**:
- **IoC Container**: Spring manages object lifecycle
- **Dependency Injection**: Spring injects dependencies (like repositories) into your classes
- **@Autowired**: Tells Spring to inject the dependency

**Interview Explanation**:
"In my UserController, I don't create UserRepository with `new`. Spring's IoC container manages it and injects it automatically. This makes my code loosely coupled and easier to test."

**Types of Injection**:
1. **Constructor Injection** (BEST PRACTICE):
```java
private final AppUserRepository userRepository;

@Autowired  // Optional in Spring 4.3+
public UserController(AppUserRepository userRepository) {
    this.userRepository = userRepository;
}
```

2. **Field Injection** (What you currently use):
```java
@Autowired
private AppUserRepository userRepository;
```

---

### 4. **Spring Boot Starter Dependencies**

**What's in Your pom.xml**:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**Interview Question**: "What is spring-boot-starter-web?"
**Your Answer**: 
- "It's a starter dependency that bundles everything needed for web applications"
- "Includes Spring MVC, REST, embedded Tomcat, and Jackson for JSON"
- "In my project, it enables me to create REST APIs easily"

**Other Starters You Use**:
- `spring-boot-starter-data-jpa`: JPA/Hibernate + database support
- `spring-boot-starter-test`: JUnit, Mockito, Spring Test

---

### 5. **Application Properties**

Your `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_portal_db
spring.datasource.username=kshitij
spring.datasource.password=kshi123
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

**Key Configurations**:
- **datasource.url**: Database connection string
- **hibernate.ddl-auto=update**: Auto-creates/updates tables based on @Entity classes
  - `create`: Drop and recreate (data loss!)
  - `update`: Update schema without data loss
  - `validate`: Only check if schema matches
  - `none`: No action

**Interview Tip**: "I use `update` in development. In production, I'd use `validate` or Flyway/Liquibase for migrations."

---

## 🔍 Your Project Deep Dive

### Architecture: 3-Layer Pattern

```
┌─────────────────────────────────────┐
│  Controller Layer (REST APIs)        │  @RestController
│  - UserController                    │  @RequestMapping
│  - JobPostingController              │  @PostMapping, @GetMapping
│  - ApplicationController             │
└────────────┬────────────────────────┘
             │
             ↓
┌────────────────────────────────────┐
│  Repository Layer (Data Access)     │  @Repository
│  - AppUserRepository                │  extends JpaRepository
│  - JobPostingRepository             │
│  - ApplicationRepository            │
└────────────┬───────────────────────┘
             │
             ↓
┌────────────────────────────────────┐
│  Model Layer (Entities)             │  @Entity
│  - AppUser                          │  @Table
│  - JobPosting                       │  @Id, @GeneratedValue
│  - Application                      │  @ManyToOne, @JoinColumn
└────────────────────────────────────┘
             │
             ↓
        MySQL Database
```

---

### 1. **Model/Entity Layer** (@Entity)

**Your AppUser Entity**:
```java
@Entity
@Table(name = "app_user")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String role; // "STUDENT" or "COMPANY"
}
```

**Interview Questions**:

**Q: What is @Entity?**
A: "Marks a class as a JPA entity that maps to a database table. In my project, AppUser maps to the `app_user` table in MySQL."

**Q: What is @Id and @GeneratedValue?**
A: "@Id marks the primary key. @GeneratedValue with IDENTITY strategy tells MySQL to auto-increment the ID when inserting new records."

**Q: What is @Column(nullable = false)?**
A: "It adds a NOT NULL constraint. If I try to save an AppUser without an email, I'll get an exception."

**Q: What's the difference between @Table(name) and no annotation?**
A: "Without @Table, Spring uses the class name as table name (app_user → app_user). With it, I can customize the table name."

---

### 2. **Repository Layer** (extends JpaRepository)

**Your Repository**:
```java
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
}
```

**🔥 MUST KNOW Interview Topics**:

**Q: What is JpaRepository?**
A: "It's a Spring Data JPA interface that provides CRUD operations without writing implementation code. I get methods like save(), findAll(), findById(), delete() for free."

**Q: How does findByEmail work?**
A: "Spring Data JPA uses method naming conventions. It parses 'findByEmail' and automatically generates the SQL query: `SELECT * FROM app_user WHERE email = ?`. I don't write any SQL!"

**Q: What are the generic types <AppUser, Long>?**
A: "AppUser is the entity type, Long is the ID type (matching @Id field)."

**Other Method Naming Patterns**:
```java
findByName(String name)                    // WHERE name = ?
findByRoleAndEmail(String role, String e)  // WHERE role = ? AND email = ?
findByIdGreaterThan(Long id)              // WHERE id > ?
findByEmailContaining(String keyword)      // WHERE email LIKE %?%
```

---

### 3. **Controller Layer** (@RestController)

**Your UserController**:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private AppUserRepository userRepository;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AppUser user) {
        // Validation
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        
        AppUser savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
```

**🔥 Interview Deep Dive**:

**Q: What's the difference between @Controller and @RestController?**
A: 
```java
@RestController = @Controller + @ResponseBody
```
- `@Controller`: Returns views (HTML pages)
- `@RestController`: Returns data (JSON/XML). Every method automatically serializes return value to JSON
- "In my placement portal, I use @RestController because I have a separate React frontend"

**Q: What is @RequestMapping("/api/users")?**
A: "Class-level annotation that prefixes all method mappings. So `@PostMapping("/signup")` becomes `/api/users/signup`."

**Q: Explain @PostMapping vs @GetMapping**
A:
- `@GetMapping`: Retrieve data (idempotent, can be cached)
- `@PostMapping`: Create/submit data (not idempotent)
- `@PutMapping`: Update entire resource
- `@PatchMapping`: Partial update
- `@DeleteMapping`: Delete resource

**Q: What is @RequestBody?**
A: "Tells Spring to deserialize JSON from HTTP request body into a Java object. When frontend sends `{"email":"test@test.com"}`, Spring converts it to AppUser object."

**Q: What is @PathVariable?**
A: "Extracts values from URL path. In `/api/users/5`, `@PathVariable Long id` captures `5`."

**Q: What is ResponseEntity?**
A: "Represents the entire HTTP response (status code + headers + body). I can return 200 OK, 400 Bad Request, 404 Not Found with custom messages."

---

### 4. **Relationships in JPA**

**Your JobPosting Entity**:
```java
@Entity
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "company_id")
    private AppUser company;
}
```

**Interview Explanation**:

**Q: Explain @ManyToOne**
A: "Many JobPostings belong to One Company. In my database, job_posting table has a `company_id` foreign key column pointing to app_user table."

**JPA Relationship Types**:
```
@OneToOne:   One User → One Profile
@OneToMany:  One Company → Many JobPostings
@ManyToOne:  Many JobPostings → One Company
@ManyToMany: Many Students ↔ Many Courses
```

**Q: What is @JoinColumn?**
A: "Specifies the foreign key column name. Without it, Spring generates a default name like `company_id`."

---

### 5. **CORS Configuration**

**Your WebConfig**:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

**Interview Explanation**:
**Q: What is CORS and why did you configure it?**
A: "CORS = Cross-Origin Resource Security. My React frontend runs on localhost:3000, backend on localhost:8080. Without CORS, browsers block API calls. I configured it to allow my frontend to make requests to /api/** endpoints."

---

## 🎤 Common Interview Questions & Answers

### Beginner Level

**Q1: What is Spring Boot and how is it different from Spring?**
**A**: "Spring Boot is built on top of Spring Framework. Spring requires a lot of XML/Java configuration, but Spring Boot provides auto-configuration, embedded servers, and starter dependencies. In my project, I didn't write any XML configs—Spring Boot configured everything based on my dependencies."

---

**Q2: Explain the architecture of your placement portal**
**A**: "I used a 3-layer architecture:
- **Controller Layer**: REST endpoints that handle HTTP requests (UserController, JobPostingController)
- **Repository Layer**: Data access using Spring Data JPA (AppUserRepository extends JpaRepository)
- **Model Layer**: Entity classes mapped to database tables (AppUser, JobPosting, Application)

The flow is: Frontend (React) → REST API → Controller → Repository → Database"

---

**Q3: How does Spring Boot connect to MySQL?**
**A**: "I added mysql-connector-j dependency in pom.xml and configured connection details in application.properties:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/placement_portal_db
spring.datasource.username=kshitij
spring.jpa.hibernate.ddl-auto=update
```
Spring Boot auto-configures DataSource and EntityManager based on these properties."

---

### Intermediate Level

**Q4: Explain Bean lifecycle in Spring**
**A**: 
```
1. Instantiation: Spring creates bean instance
2. Populate properties: Injects dependencies (@Autowired)
3. BeanNameAware: If bean implements interface
4. @PostConstruct: Custom initialization
5. Bean ready to use
6. @PreDestroy: Before bean destruction
```

---

**Q5: What is the use of @Transactional?**
**A**: "Manages database transactions. If I add @Transactional on a method, all database operations either complete successfully or rollback on exception."

Example:
```java
@Transactional
public void applyForJob(Long studentId, Long jobId) {
    // If any step fails, everything rolls back
    JobPosting job = jobRepository.findById(jobId).orElseThrow();
    AppUser student = userRepository.findById(studentId).orElseThrow();
    Application app = new Application(student, job);
    applicationRepository.save(app);
}
```

---

**Q6: How do you handle exceptions in Spring Boot?**
**A**: "I can use @ControllerAdvice with @ExceptionHandler:
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntime(RuntimeException e) {
        return ResponseEntity.status(500).body(e.getMessage());
    }
}
```
This catches exceptions from all controllers."

---

### Advanced Level

**Q7: What is the N+1 query problem and how to solve it?**
**A**: "When fetching a list of JobPostings with company details, Hibernate executes:
- 1 query to get all jobs
- N queries to get each company (one per job)

Solution: Use JOIN FETCH:
```java
@Query("SELECT j FROM JobPosting j JOIN FETCH j.company")
List<JobPosting> findAllWithCompany();
```
Or add `@EntityGraph` annotation."

---

**Q8: How does Spring Boot auto-configuration work?**
**A**: "Spring Boot uses @Conditional annotations to configure beans based on classpath and properties. For example:
- If it finds `mysql-connector-j` → configures MySQL DataSource
- If it finds `spring-boot-starter-web` → configures Tomcat, DispatcherServlet
- I can see all auto-configurations with `--debug` flag when running the app."

---

**Q9: Explain lazy vs eager loading in JPA**
**A**: 
```java
@ManyToOne(fetch = FetchType.LAZY)   // Loads company only when accessed
private AppUser company;

@ManyToOne(fetch = FetchType.EAGER)  // Loads company immediately with job
private AppUser company;
```
- **LAZY** (default for @ManyToOne): Better performance, loads on-demand
- **EAGER**: Can cause performance issues with multiple relationships
- "In my project, I use LAZY for company details to avoid loading unnecessary data."

---

## 💪 Hands-on Exercises

### Exercise 1: Add Custom Query Methods
Add these to AppUserRepository:
```java
List<AppUser> findByRole(String role);
List<AppUser> findByNameContainingIgnoreCase(String keyword);
@Query("SELECT u FROM AppUser u WHERE u.email LIKE %:domain")
List<AppUser> findByEmailDomain(@Param("domain") String domain);
```

---

### Exercise 2: Create a Service Layer
Add business logic separation:
```java
@Service
public class UserService {
    
    @Autowired
    private AppUserRepository userRepository;
    
    @Transactional
    public AppUser registerUser(AppUser user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }
    
    public List<AppUser> getAllStudents() {
        return userRepository.findByRole("STUDENT");
    }
}
```

---

### Exercise 3: Add Validation
Use Bean Validation:
```java
@Entity
public class AppUser {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50)
    private String name;
    
    @Email(message = "Invalid email")
    @NotBlank
    private String email;
    
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
```

Then in controller:
```java
@PostMapping("/signup")
public ResponseEntity<?> signup(@Valid @RequestBody AppUser user) {
    // @Valid triggers validation
}
```

---

### Exercise 4: Add Pagination
```java
@GetMapping
public Page<JobPosting> getAllJobs(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size
) {
    Pageable pageable = PageRequest.of(page, size);
    return jobRepository.findAll(pageable);
}
```

---

## 🗣️ What to Say in Interviews

### When Describing Your Project (30 seconds):
"I built a Placement Portal using Spring Boot 3.5 and MySQL. It has two user types: students and companies. Companies can post jobs with eligibility criteria like minimum CGPA, and students can apply if they meet the requirements. 

I implemented RESTful APIs with proper layering—controllers handle requests, repositories manage data access using Spring Data JPA, and entities map to database tables. The frontend is React, and I configured CORS to allow cross-origin requests. The application demonstrates CRUD operations, JPA relationships, and proper exception handling."

---

### When Asked About Challenges:
"Initially, I faced CORS issues when my React app tried to call Spring APIs. I learned about CORS and implemented WebMvcConfigurer to allow requests from localhost:3000.

Another challenge was understanding JPA relationships. I had to learn about @ManyToOne for job postings belonging to companies, and how @JoinColumn creates foreign key constraints.

I also learned about validation—initially, I didn't validate user inputs, which could cause database errors. I added validation in my controller to check required fields."

---

### Technical Strengths to Highlight:
1. "I understand the 3-layer architecture and separation of concerns"
2. "I can work with JPA repositories and write custom query methods"
3. "I've configured database connections and understand hibernate.ddl-auto options"
4. "I know RESTful API design principles (GET for retrieval, POST for creation)"
5. "I've worked with entity relationships (@ManyToOne)"

---

## 📝 Study Checklist (Priority Order)

**Week 1: Fundamentals**
- [ ] Understand @SpringBootApplication
- [ ] Learn Dependency Injection & IoC
- [ ] Master @RestController, @GetMapping, @PostMapping
- [ ] Understand @Entity, @Id, @GeneratedValue
- [ ] Practice with JpaRepository

**Week 2: Intermediate**
- [ ] Learn @Transactional
- [ ] Understand exception handling (@ControllerAdvice)
- [ ] Practice JPA relationships (@OneToMany, @ManyToOne)
- [ ] Learn custom query methods in repositories
- [ ] Understand application.properties configurations

**Week 3: Advanced**
- [ ] Learn Bean lifecycle & scopes
- [ ] Understand Spring Boot auto-configuration
- [ ] Practice with @Query annotations
- [ ] Learn about lazy vs eager loading
- [ ] Understand N+1 query problem

---

## 🎯 Interview Preparation Tips

### 1. **Always Refer to Your Project**
❌ "JPA is used for database operations"
✅ "In my placement portal, I used JPA with AppUserRepository to perform database operations like findByEmail() without writing SQL"

### 2. **Be Ready to Code**
Practice writing on paper:
- A simple @RestController with CRUD operations
- An @Entity with relationships
- A Repository interface with custom methods

### 3. **Understand the "Why"**
- Why 3-layer architecture? (Separation of concerns, testability)
- Why JPA over JDBC? (Less boilerplate, auto-generates queries)
- Why Spring Boot over Spring? (Auto-configuration, embedded server)

### 4. **Know the Alternatives**
- Instead of MySQL → PostgreSQL, H2
- Instead of JPA → MyBatis, JDBC Template
- Instead of REST → GraphQL, gRPC

### 5. **Common Follow-up Questions**
When you mention something, expect: "Can you explain how that works?"
- If you say "I used JPA", be ready to explain entity lifecycle
- If you say "REST APIs", be ready to explain HTTP methods
- If you say "CORS", be ready to explain cross-origin security

---

## 🔗 Additional Resources

### Official Docs:
- Spring Boot Reference: https://docs.spring.io/spring-boot/docs/current/reference/html/
- Spring Data JPA: https://spring.io/projects/spring-data-jpa

### Practice:
- Extend your project with new features
- Try building a simple REST API from scratch
- Read Spring Boot source code on GitHub

---

## ✅ Final Checklist Before Interview

- [ ] Can explain your project in 30 seconds
- [ ] Can draw your project architecture on whiteboard
- [ ] Know all annotations you've used (@Entity, @RestController, etc.)
- [ ] Can write a simple controller method from memory
- [ ] Understand the flow: Frontend → Controller → Repository → Database
- [ ] Can explain at least one challenge you faced
- [ ] Know basics of REST, HTTP methods, status codes
- [ ] Understand JPA relationships in your entities

---

**Good Luck! 🚀**

Remember: Interviewers want to see that you **understand** what you built, not just that you built it. Be confident, relate everything to your project, and you'll do great!
