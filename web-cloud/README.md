# Design - Web & Cloud for Gym Buddy
TODO(shrenirao):
## Tech stack Dev setup

**Frontend:** React (Vite for faster builds), Axios, React Router DOM, Material UI, Recharts  
**Backend:** Node.js, Express.js, MongoDB (via Mongoose), JWT for authentication, bcryptjs for password hashing  
**Cloud Services:** MongoDB Atlas (cloud-hosted database)  
**Version Control:** Git + GitHub (monorepo structure)  

---

## Development Setup

 1. Version Control & Project Structure
Repository is organized as a **monorepo**:
- Initialized Git repository with `.gitignore` configured for `node_modules`, `.env`, and build artifacts.  
- Linked to GitHub repository for version control and collaboration.  


INITIALIZE PROJECT:
```bash
npm init -y
```
Install dependencies:
```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```
Create .env file secrets:
```bash
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```
Running locally  

Backend:
```bash
cd api
nodemon server.js
```
FrontEnd:
```bash
cd client
npm run dev
```



## DB Dev setup

1. **DynamoDB – Logs & Metadata**  
   - **Local Dev:** Use DynamoDB Local (runs in Docker or as a local JAR) so you don’t have to hit AWS for every query during development.  
   - **Provisioning:** Create tables with `aws dynamodb create-table` or through CDK/CloudFormation for consistent schema.  
   - **IAM:** Dev users should have restricted access to only the dev tables.

2. **RDS – Relational DB**  
   - **Local Dev:** Spin up the same engine locally via Docker (e.g., Postgres/MySQL) with matching major version to RDS.  
   - **Migrations:** Use a tool like Flyway or Liquibase to keep schema in sync between local, dev, and prod.  
   - **Networking:** In AWS dev/staging, use a public RDS instance or connect via AWS Session Manager/Bastion Host if it’s private.

3. **S3 – Video Snippets**  
   - **Local Dev:** Use LocalStack to mock S3 and lightweight object storage locally.  
   - **Pre-signed URLs:** Build these into your backend to test uploading/downloading flows.

4. **ElastiCache – Caching Layer**  
   - **Local Dev:** Use Redis locally in Docker.  
   - **Connection:** Use environment variables to swap between local and AWS endpoint.  
   - **Persistence:** Disable persistence in local dev for speed; enable RDB/AOF persistence in prod if needed.  
   - **Eviction Policy:** Test with the same eviction settings you’ll use in production (volatile-lru / allkeys-lru).

5. **Environment Isolation**  
   Separate dev/staging/prod AWS accounts or at least separate VPCs and resource namespaces.

6. **CI/CD**  
   Set up pipelines that deploy to a dev environment automatically on merge to main branch.

## Data flow diagram

1. Authentication Service
Manages user authentication and session management

2. Workout Session Service
Tracks and saves workout session data

3. Set Logging Service
Logs and saves set data for workouts

4. Diet Logging Service
Logs food intake and calculates nutritional data

5. Goal Manager
Sets and manages user fitness goals

6. Chat Memory Manager
Manages chat sessions and stores chat history

7. User & Role Service
Handles user creation and role-based access control

8. Exercise Service
Manages exercise data with CRUD operations

9. Video Upload Service
Uploads videos and triggers AI analysis

10. Progress Tracker Service
Tracks and displays user progress

11. Feedback System
Facilitates feedback between trainers and clients

<img width="1391" height="824" alt="image" src="https://github.com/user-attachments/assets/712ca945-ae50-40a5-a550-32ca20e71dbe" />


## Database schema

### Users
- **user_id** (PK, UUID)  
- **email** (VARCHAR, UNIQUE, NOT NULL)  
- **password_hash** (VARCHAR, NOT NULL)  
- **full_name** (VARCHAR)  
- **role** (VARCHAR, DEFAULT 'gym_goer') — Can be `"gym_goer"` or `"coach"`  
- **created_at** (TIMESTAMP)  

### Coach_client_map  
_Handles the relationship between coaches and their clients_  
- **coach_id** (FK → users.user_id)  
- **client_id** (FK → users.user_id)  
- **Primary Key**: (coach_id, client_id)  

### Exercise_definitions  
_A master list of exercises the AI can identify_  
- **exercise_def_id** (PK, INT)  
- **name** (VARCHAR, UNIQUE, NOT NULL) — e.g., `"Squat"`, `"Push-up"`, `"Bicep Curl"`  
- **description** (TEXT)  

### Workout_sessions  
- **session_id** (PK, UUID)  
- **user_id** (FK → users.user_id)  
- **start_time** (TIMESTAMP, NOT NULL)  
- **end_time** (TIMESTAMP)  
- **notes** (TEXT)  

### Logged_exercises  
_An instance of an exercise performed during a session_  
- **logged_exercise_id** (PK, UUID)  
- **session_id** (FK → workout_sessions.session_id)  
- **exercise_def_id** (FK → exercise_definitions.exercise_def_id)  

### Sets  
_The individual sets for each logged exercise_  
- **set_id** (PK, UUID)  
- **logged_exercise_id** (FK → logged_exercises.logged_exercise_id)  
- **rep_count** (INT, NOT NULL)  
- **weight_kg** (DECIMAL, NULLABLE)  
- **rest_period_seconds** (INT) — Rest time after this set  
- **timestamp** (TIMESTAMP)  


## List of APIs 

TODO(Rishi4182):

### Authentication
- **RBAC (Role Based Access Control)** – users and coaches
  - `GET /roles` – list available roles
  - `POST /roles` – create new role (admin-only)
  - `PATCH /users/{id}/role` – change user’s role

### User Logs and Settings
- `GET /users/{id}` – get user profile
- `PATCH /users/{id}` – update profile info
- `GET /users/{id}/settings` – get settings
- `PATCH /users/{id}/settings` – update settings
- `GET /users/{id}/activity-logs` – fetch activity logs
- `POST /users/{id}/activity-logs` – create new log entry

### Chat Memory (Cloud)
- `POST /chats` – start a new conversation
- `GET /chats/{chat_id}` – get conversation history
- `POST /chats/{chat_id}/messages` – send a new message
- `GET /chats/{chat_id}/messages` – fetch messages
- `DELETE /chats/{chat_id}` – delete conversation

### Video Uploads and Processing (Cloud) – Workout Logs and Tracking
- `POST /videos` – upload workout video
- `GET /videos/{id}` – get video metadata
- `GET /videos/{id}/stream` – stream video
- `DELETE /videos/{id}` – delete video

### Diet Uploads, Processing, and Tracking (Logs)
- **Workouts**
  - `POST /workouts` – log a workout session
  - `GET /workouts` – get user’s workout history
  - `GET /workouts/{id}` – get workout details
  - `PATCH /workouts/{id}` – update workout log
  - `DELETE /workouts/{id}` – delete log
- **Diet**
  - `POST /diet` – log a diet entry
  - `GET /diet` – get user’s diet history
  - `GET /diet/{id}` – get diet entry details
  - `PATCH /diet/{id}` – update diet entry
  - `DELETE /diet/{id}` – delete diet entry
  - `GET /diet/summary` – get daily nutrient summary
  - `GET /diet/stats` – get weekly or monthly nutrient statistics

### Progress and Session Tracking (Heat Maps and Streaks)
- `GET /progress/heatmap` – get activity heatmap
- `GET /progress/streak` – get current streak
- `GET /progress/summary` – get monthly/weekly summary

### Goals and Preferences (Schedule)
- **Goals**
  - `POST /goals` – set new goal
  - `GET /goals` – fetch user goals
  - `PATCH /goals/{id}` – update goal
  - `DELETE /goals/{id}` – remove goal
- **Preferences**
  - `GET /preferences` – get preferences (schedule, notifications)
  - `PATCH /preferences` – update preferences

### Workout Session Analytics and Dashboard
- `GET /analytics/workouts` – workout stats
- `GET /analytics/diet` – diet compliance
- `GET /analytics/performance` – performance metrics over time
- `GET /analytics/engagement` – session attendance, chat frequency


## Security
TODO(SaiKoushikReddy_Anumula):
#  Security & Authentication Design

## 1. User Authentication (Multi-Factor Authentication)

**Design:**
- **Primary Authentication:** Email/password  
- **Second Factor:** SMS-based OTP  
- **Security Enhancements:** Auto-logout on suspicious device login  

---

## 2. Secure Video Processing

**Design:**
- **On-device AI Inference:** Detect and classify workouts locally to reduce cloud exposure  
- **If cloud processing is needed:**  
  - Upload with short-lived signed URLs (write-only)  
  - Auto-delete raw footage after processing unless user opts to keep  

---

## 3. Role-Based Access Control (User / Coach)

**Design:**
- **Roles:**  
  - **User:** Access only their own workout data  
  - **Coach:** View data only from users who explicitly grant access  
- **Enforcement:**  
  - Backend authorization checks before data retrieval  
  - Database queries restricted to the authenticated user’s permissions  

---

## 4. User Control & Transparency

**Design:**
- **Access Logs:** Show all people (coaches/admins) who accessed each video, with timestamps and device info  
- **User Actions:**  
  - Revoke access instantly  
  - Download/export personal data  
  - Permanently delete videos  

---

## 5. Audit Logging

**Design:**
- **Events Logged:**  
  - User login/logout attempts  
  - Video/data access by any role  
  - Permission changes (e.g., granting coach access)  
- **Security:**  
  - Append-only, tamper-resistant log storage  
  - Regular log reviews with alerts for abnormal patterns  

---

## 6. Secure Cloud Infrastructure

**Design:**
- **Private Network:** Keep backend servers hidden inside a secure cloud network  
- **Strict Access:** Only give people/services the permissions they need  
- **Encrypted Data:** Protect stored and transferred data with strong encryption (so even if stolen, it’s useless)  
- **Backup & Recovery:** Keep secure backups for quick recovery  


