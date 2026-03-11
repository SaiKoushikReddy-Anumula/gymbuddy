# Design - Mobile for Gym Buddy

## Tech Stack & Development Setup

The mobile application for **Gym Buddy** is built using **React Native** with **Expo** for rapid development, **TypeScript** for type safety, and **Zustand** for lightweight state management.

## Steps to Checkout and Run the App

### 1. Prerequisites

Ensure the following are installed on your system:

- **Node.js** (LTS version recommended) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- **Expo Go App** on your Android/iOS device (for testing) - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779)

### 2. Clone the Repository

```bash
git clone <repo-url>
cd mobile/myApp
```

### 3. Install Dependencies

```bash
npm install
# or
yarn install
```

### 4. Run the Application

```bash
npx expo start
```

This will:
- Start the Expo development server
- Display a QR code in the terminal or Expo Dev Tools
- You can scan the QR code with the **Expo Go** app on your phone to view the app

## Starter Template Structure

The project is initialized with:

- **Navigation** – `@react-navigation/native` for app screens and routing
- **Zustand** – for state management
- **TypeScript** – for type safety
- **Basic Folder Structure**:

```
myApp/
├── assets/              # Images, fonts, etc.
├── src/
│   ├── screens/         # Screen components
│   ├── store/          # Zustand state management
│   └── navigation/     # Navigation config
├── App.tsx
├── package.json
├── tsconfig.json
```

## Navigation Setup

React Navigation is pre-configured with:
- **Stack Navigator** for main flows
- Example screens: `HomeScreen`, `ProfileScreen`

## State Management with Zustand

Zustand is used for global state handling.

## Running on a Physical Device

1. Connect your device to the same Wi-Fi network as your computer
2. Open the **Expo Go** app
3. Scan the QR code shown in your terminal or browser after running:

```bash
npx expo start
```

## Running on an Emulator

- **Android**: Install **Android Studio**, set up a Virtual Device, and run:
  ```bash
  npx expo start --android
  ```

- **iOS** (Mac only): Install **Xcode** and run:
  ```bash
  npx expo start --ios
  ```

## Data flow
# Components of Gym Buddy

## External Entities
- **User** – Inputs personal data, workout videos; receives plans and feedback.
- **Nutrition Database** – External food and nutrition info.
- **Medical Knowledge Base** – External source for health/safety suggestions.

---

## Processes

### 1. Manage User Profile
- Handles user registration, login, and profile updates.
- Stores essential data: age, gender, weight, height, fitness goals, medical history.
- Sends this data to other processes like workout/diet generation and medical suggestions.

### 2. Generate Workout Plan
- Uses AI/ML algorithms to create a personalized exercise routine.
- Factors considered:
  - User goals (e.g., weight loss, muscle gain)
  - Fitness level
  - Workout history
- Integrates progressive overload principles, rest days, and focus areas.
- Sends back a workout plan to the user.

### 3. Generate Diet Plan
- Builds a personalized meal plan using:
  - User profile and goals
  - Dietary preferences or restrictions (e.g., vegetarian, lactose intolerance)
  - Data from external nutrition databases
- Returns a daily or weekly meal plan with calorie and macronutrient breakdown.

### 4. Provide Medical Suggestions
- Uses user-provided health data (e.g., joint issues, previous injuries).
- Applies logic or accesses a medical knowledge base.
- Feedback includes:
  - Warnings for risky exercises
  - Alternative safer workouts
  - Advice to consult a physician if needed

### 5. Preprocess Video Input
- Handles raw video uploads from the user.
- Performs:
  - Background blurring (privacy)
  - Frame extraction
  - Conversion to suitable format for ML analysis
- Sends output to classification process.

### 6. Video Segmentation & Classification
- Performs pose estimation and identifies exercises.
- Works frame-by-frame using ML models (e.g., OpenPose, MoveNet).
- Outputs exercise labels like `"squat"`, `"push-up"`, etc.
- Sends results to error detection and workout logging.

### 7. Identify Form Errors
- Compares user’s exercise form to an ideal reference.
- Detects:
  - Improper posture
  - Incomplete reps
  - Dangerous joint angles
- Provides correction feedback (text or visual cues).

### 8. Log Workout History
- Collects metrics from classified videos:
  - Number of reps, sets
  - Duration
  - Accuracy score
- Stores in **Workout Logs DB**.
- Data is used for progress tracking and model retraining.

### 9. Predict Progress
- Uses workout history to forecast fitness trends.
- Predicts:
  - Strength/endurance gains
  - Plateaus
  - Estimated goal achievement time
- Helps motivate users and adjust plans proactively.

### 10. Retrain ML Models
- Continuously improves AI system using new data.
- Retrains:
  - Pose estimation models
  - Exercise classification models
  - Progress prediction models
- Updates models in **ML Model Store**.

---

## Data Stores

### D1: User Profiles DB
- Stores:
  - Name, age, gender, height, weight
  - Fitness goals
  - Medical history
  - Preferences (diet/workout restrictions)
- Used by workout & diet plan generators and medical suggestion engine.

### D2: Workout Logs DB
- Maintains:
  - Dates of sessions
  - Exercise classification
  - Performance metrics
  - Feedback logs
- Used for predicting progress, retraining ML models, and showing history.

### D3: Diet Logs DB
- Stores:
  - Generated diet plans
  - User compliance data
  - Nutritional intake logs (manual tracking)
- Helps improve diet recommendations.

### D4: Video Records Store
- Contains:
  - Raw workout videos
  - Preprocessed videos or extracted keypoints
- Used in:
  - Video analysis
  - Form error detection
- May integrate with cloud storage (AWS S3, GCP).

### D5: ML Model Store
- Stores trained and updated ML models:
  - Pose estimation
  - Exercise classification
  - Diet/workout generation
  - Progress prediction
- Ensures all intelligent features use the latest AI models.
- Updated via **Retrain ML Models** process.

## Device APIs
# The required API's are :-

- **Speech-to-Text API and Text-to-Speech API** - To allow users to talk to chatbot voice and to read out personalized plans.
- **Camera API and Pose Detection** - To analyze user's posture and count reps.
- **Pose Estimation API and Accelerometer** - To improve real-time motion accuracy and detect exercise types.
- **Local Storage API** - To store diet logs offline and sync to cloud.
- **Internet and Network API** - To fetch meal suggestions based on user's calories goals.
- **Haptic Feedback API** - Triggering vibrations for alerting.
- **Firebase Realtime Database** - To display global and friends leaderboard.
- **Remote Config API** - To customize the challenges based on fitness stage and to update challenges without app update.
- **Form input API and Feedback API** - Allow rating in terms of stars/sliders.
- **In-App Billing API** - To handle expenses and to allow subscriptions depending on user preferences.
- **Canvas/3D API** - To create 3D animation and show muscle gain with respect to BMI.
- **Alarm Manager API** - To schedule daily workout.
- **Fused Local Provider API** - To suggest nearby gyms with respect to the user.

## Backend APIs required

Backend APIs Required
The following backend services are required to support all mobile app features for GymBuddy. These endpoints will be consumed by the mobile client and will power authentication, workout tracking, media uploads, analytics, and more.

1. Authentication
POST /auth/register – User registration.

POST /auth/login – Login with credentials.

POST /auth/logout – Invalidate active session/token.

POST /auth/refresh – Refresh authentication tokens.

2. Role-Based Access Control (RBAC)
GET /roles – Fetch available roles (e.g., user, coach).

POST /roles/assign – Assign role to a user.

Role enforcement middleware for protected endpoints.

3. User Logs and Settings
GET /users/{id}/settings – Fetch user preferences & personal settings.

PATCH /users/{id}/settings – Update user preferences.

GET /users/{id}/logs – Fetch user logs.

4. Chat Memory (Cloud)
POST /chat – Store a chat message.

GET /chat/history?coachId={id}&userId={id} – Retrieve chat history.

5. Video Uploads and Processing (Cloud)
POST /videos/upload – Upload workout video.

POST /videos/process – Process uploaded video for workout detection.

GET /videos/{id}/stats – Retrieve detected workout type & stats.

6. Workout Logs and Tracking
POST /workouts/log – Log workout details (type, reps, sets, duration).

GET /workouts/history – Fetch workout history (filter by date/type).

7. Diet Uploads, Processing, and Tracking
POST /diet/upload – Upload diet image or text.

POST /diet/process – Classify and log meals.

GET /diet/history – Retrieve food log.

8. Progress and Session Tracking
GET /progress/weekly – Weekly progress overview.

GET /progress/monthly – Monthly progress overview.

GET /progress/streaks – Session streak counters.

GET /progress/heatmap – Heat map data for session tracking.

9. Goals and Preferences (Schedule)
POST /goals – Set user goals.

PATCH /goals/{id} – Update goals.

GET /schedule – Fetch workout and diet schedule.

POST /schedule – Set schedule.

10. Trainer Feedback
POST /feedback – Submit trainer feedback on a session.

GET /feedback/{userId} – View trainer feedback.

11. Workout Session Analytics and Dashboard
GET /analytics/summary – Summary of performance metrics.

GET /analytics/trends – Trends and insights for dashboard.

## Play Store Setup

Update on  Setup account on Play store
Google Play Console Account Setup – Status Update

Account Details:

Email: gymbuddypg3@gmail.com

Playstore Console Mail:mobile25ninjas@gmail.com

Account created and verified successfully

Credentials securely saved via Google Password Manager and shared among teammates .


Steps Completed:

<img width="1273" height="995" alt="Image" src="https://github.com/user-attachments/assets/b489c453-4a97-44d6-8df3-c90ca0d4cbd3" />

1. Created new Google account
2. Logged in to Google Play Console
3. Accepted Developer Distribution Agreement
4. Completed developer profile (name, email, phone)
5. Finished identity verification
6. Developer account creation successful
![WhatsApp Image 2025-08-21 at 18 21 24_7c9d38a7](https://github.com/user-attachments/assets/ec83d1e0-8c8c-4d18-88f3-0e45ebfd8659)

# Google Play Console Developer Account Verification Progress

- 1: Identity documents submitted and approved  
- 2: Contact phone number verification completed  
- 3: Android mobile device access verified  

Your Google Play Console Developer Account is now fully verified and ready to use.


## Deployment Guide – GymBuddy (Mobile App)

This document outlines the deployment process of the **GymBuddy Android app** to **Google Play Console**.  
It covers both the **first-time deployment** and the **redeployment flow** for future releases.

---

##  1. First Deployment (Initial Setup)

The first deployment requires extra setup in the Play Console (store listing, policies, assets).

### Step 1: Local Setup
- Verify the app runs locally:
  ```bash
  expo start


Configure app.json with:

name

slug

android.package

Step 2: Build Android App Bundle
npx eas-cli build -p android --profile production


Generates .aab bundle for Play Store

--profile production → uses eas.json config

Step 3: Google Play Console Setup

Open Google Play Console

Create a new App record

Complete the Store listing:

Title, short & full description

App icon, screenshots, feature graphic

Privacy policy URL

Configure App policies:

App access → Open

Ads declaration → None

Content rating → Fitness, teen safe

Target audience → 13+

Data safety → Minimal, encrypted in transit

Account/data deletion links

Step 4: Upload & Release

Go to Test and release → Internal testing

Click Create new release

Upload the .aab

Add release notes (e.g., Initial release)

Save → Review release → Start rollout

Step 5: Share With Testers

Copy the opt-in link generated by Play Console

Share it with testers via email, Slack, etc.

## 2. Redeployment (Subsequent Releases)

For releasing updates after the first deployment.

Step 1: Build New .aab
npx eas-cli build -p android --profile production


Generates new .aab

Expo automatically increments versionCode

Step 2: Upload to Play Console

Open Google Play Console

Navigate to Internal testing → Create new release

Upload the new .aab

Ensure versionCode > last release


