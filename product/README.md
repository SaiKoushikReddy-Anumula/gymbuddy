# Design - Product for Gym Buddy

## Updating Product backlog

TODO(sari-ka): 

[GymBuddy_Product_Backlog_TestCases.xlsx](https://github.com/user-attachments/files/22919760/GymBuddy_Product_Backlog_TestCases.xlsx)


updated product backlog and testcases with all possible positive and negative testcases

## Wire frame (Desktop)

TODO(akshayachigullapally): 

[GymBuddy wireframe2.pdf](https://github.com/user-attachments/files/21756090/GymBuddy.wireframe2.pdf)

Finished desktop Wireframes for GymBuddy 


## Test plan (Desktop)

TODO(bhukyaashoknayak): 

📝 Test Plan – GymBuddy (Desktop Web Application)

1. Objective
The purpose of this test plan is to ensure that the GymBuddy desktop web application functions correctly, is user-friendly, secure, and performs efficiently across supported desktop browsers.

---

 2. Scope
- Desktop browsers: Chrome, Firefox, Edge, Safari
- Core features: Login, Workout Tracking, Dashboard, History, Settings
---
 3. Test Environment
- *Hardware:* Windows 10/11 PC, macOS (latest version)
- Browsers: Chrome, Firefox, Edge, Safari (latest versions)
---

 4. Test Types
4.1 Functional Testing
- User signup/login/logout
- Start and stop workout tracking
- AI exercise detection & repetition counting
- Workout summary saving
- Viewing workout history

4.2 Usability Testing
- Smooth navigation across pages
- Button responsiveness
- UI readability and clarity

4.3 Performance Testing
- Dashboard load time < 3s
- Camera start time < 2s
- Real-time detection lag < 200ms

 4.4 Security Testing
- Handle invalid login attempts securely
- Prevent SQL injection & input manipulation
- Restrict unauthorized access

---

 5. Entry & Exit Criteria
Entry Criteria
- Application build deployed on staging
- AI model integrated with workout detection  
Exit Criteria
- All high and medium priority test cases pass  
- No critical/blocker defects remain  
-

## Wire frame (Mobile)

TODO(deekshhh37):
[GymBuddy wireframe mobile.pdf](https://github.com/user-attachments/files/21823404/GymBuddy.wireframe.mobile.pdf)

## Test plan (Mobile)

TODO(JathinYanna04)

## 📱 Test Plan: Device Compatibility and Performance Validation

---

### ✅ Phase 1: Minimum Requirements Validation
- **Duration**: 3 weeks  
- **Focus**: Core functionality on basic devices  
- **Devices**: Entry-level phones, older flagships  
- **Success Criteria**: App launches and basic tracking works  

**Test Scenarios**:
- Installation on minimum spec devices
- Basic exercise detection functionality
- Essential user flows completion
- Crash-free operation for 1-hour sessions

---

### ⚙️ Phase 2: Optimum Requirements Testing
- **Duration**: 4 weeks  
- **Focus**: Enhanced performance on mid-range+ devices  
- **Devices**: Current mid-range and flagship phones  
- **Success Criteria**: Smooth, responsive experience  

**Test Scenarios**:
- Advanced AI feature accuracy
- Extended session testing (2–4 hours)
- Multi-tasking scenarios
- Performance under various loads

---

### 🚀 Phase 3: Ideal Requirements Validation
- **Duration**: 2 weeks  
- **Focus**: Premium experience on latest devices  
- **Devices**: Latest flagship phones and tablets  
- **Success Criteria**: Cutting-edge performance and features  

**Test Scenarios**:
- Maximum performance utilization
- Advanced feature integration
- Future-proofing validation
- Beta feature testing

---

## 📊 Success Metrics by Tier

### 🟩 Minimum Tier Success:
- 90%+ app stability  
- 85%+ core feature accuracy  
- Works on 80%+ of target devices  
- <10% crash rate  

### 🟨 Optimum Tier Success:
- 98%+ app stability  
- 95%+ feature accuracy  
- Works on 95%+ of target devices  
- <2% crash rate  
- 4.0+ app store rating  

### 🟦 Ideal Tier Success:
- 99.9%+ app stability  
- 98%+ feature accuracy  
- Works on 99%+ of compatible devices  
- <0.5% crash rate  
- 4.5+ app store rating  
- Industry benchmark performance  

---


## ✅ Positive Test Cases – MOBILE APP

---

### 🔹 TC-001: User Registration with Valid Data

**🎯 Goal**: Ensure new users can register successfully

**🧩 Preconditions**:
- App is installed  
- Internet is available  
- User has a valid email  

**▶️ Steps**:
1. Open app  
2. Tap "Sign Up"  
3. Fill in email, password, name, age, height, goal  
4. Tap "Create Account"  
5. Confirm email via link  
6. Log in to the app  

**✅ Expected**:
- All inputs accepted  
- Account created and email verified  
- User redirected to dashboard  
- Welcome message shown  
- Data saved after restart  

---

### 🔹 TC-002: Squat Detection & Counting

**🎯 Goal**: Check real-time squat tracking with camera

**🧩 Preconditions**:
- User is logged in  
- Camera is allowed  
- Good lighting and space  

**📱 Setup**:
- Phone placed 6ft away at chest height  

**▶️ Steps**:
1. Go to "Start Workout"  
2. Start camera and begin squats (15 reps)  
3. Watch counter and feedback  
4. Finish and review summary  

**✅ Expected**:
- Exercise detected as squats  
- Counter tracks reps (±1 margin)  
- "Good Form" shown on most reps  
- Feedback and overlay visible  
- Session saved to history  

---

### 🔹 TC-003: XP and Badge Rewards

**🎯 Goal**: Verify rewards after completing a workout

**🧩 Preconditions**:
- New user (0 XP)  
- Profile completed  

**▶️ Steps**:
1. Start workout with:  
   - 10 squats (5 XP)  
   - 8 push-ups (4 XP)  
   - 30s plank (3 XP)  
2. Finish session  
3. Check XP and badge updates  
4. Complete daily challenge (optional)  

**✅ Expected**:
- Total 12 XP added  
- "First Workout" badge unlocked  
- Progress bar and XP updated  
- Daily streak shows 1 day  
- Leaderboard updated if available  

---

### 🔹 TC-004: Workout History & Progress

**🎯 Goal**: Ensure past workouts and progress are saved and viewable

**🧩 Preconditions**:
- User completed 3 previous sessions  
- Logged in with internet  

**▶️ Steps**:
1. Open "Workout History"  
2. Check list of past workouts  
3. Tap one to view details  
4. Go to "Progress" tab  
5. View charts and trends  
6. Test export option  

**✅ Expected**:
- 3 workouts listed with correct data  
- Detailed stats shown for each  
- Progress charts display properly  
- Export works (PDF/CSV)  
- Data is accurate and complete  

---




This issue tracks the test cases for the MOBILE App, covering both **positive** (expected user behavior) and **negative** (error or edge cases) scenarios.  
Use the **Pass/Fail** column to mark execution results.

---

## ✅ Positive Test Cases

| TC ID | Test Case Name | Goal | Preconditions | Steps | Expected Result | Pass/Fail |
|-------|----------------|------|---------------|-------|-----------------|-----------|
| TC-001 | User Registration with Valid Data | Ensure new users can register successfully | App installed; Internet available; Valid email | 1. Open app<br>2. Tap "Sign Up"<br>3. Fill in details<br>4. Tap "Create Account"<br>5. Confirm email<br>6. Login | All inputs accepted; Email verified; Redirect to dashboard; Data saved | ⬜ |
| TC-002 | Squat Detection & Counting | Check real-time squat tracking | User logged in; Camera allowed; Good lighting/space | 1. Start workout<br>2. Begin 15 squats<br>3. Review counter<br>4. Finish and review | Squats detected; Counter accurate (±1); Feedback shown; Session saved | ⬜ |
| TC-003 | XP & Badge Rewards | Verify rewards after workout | New user (0 XP); Profile completed | 1. Perform workout (10 squats, 8 push-ups, 30s plank)<br>2. End session<br>3. Check rewards | XP +12; Badge awarded; Progress bar updates; Leaderboard updated | ⬜ |
| TC-004 | Workout History & Progress | Ensure past workouts are saved | 3 previous sessions; Internet available | 1. Open history<br>2. View details<br>3. Check charts<br>4. Export data | History accurate; Charts correct; Export works | ⬜ |
| TC-005 | App Launch | Verify app launches without crash | App installed; Device meets min specs | 1. Tap app icon | Splash screen loads; Home screen displayed in <3s | ⬜ |
| TC-006 | Login with Valid Credentials | Ensure returning users can log in | Account exists; Internet available | 1. Enter valid email & password<br>2. Tap "Login" | Login successful; Redirect to dashboard | ⬜ |
| TC-007 | Profile Update | Verify user can update profile | User logged in | 1. Go to profile<br>2. Change details<br>3. Save | Changes saved; Confirmation shown; Data persists after restart | ⬜ |
| TC-008 | Offline Workout Logging | Ensure workouts log offline | App installed; No internet | 1. Start workout offline<br>2. Complete & save<br>3. Reconnect to internet | Workout syncs after reconnection | ⬜ |
| TC-009 | Notifications | Ensure reminders are sent | Notifications enabled | 1. Set workout reminder<br>2. Wait for scheduled time | Notification arrives on time | ⬜ |
| TC-010 | Dark Mode Support | Verify UI switches to dark mode | Device supports dark mode | 1. Change device theme | App UI updates instantly to dark mode | ⬜ |

---

## ❌ Negative Test Cases

# GymBuddy – Comprehensive Negative Test Cases (Unified Table)

| Test ID | Priority | Category | Test Scenario | Test Data / Steps | Expected Result | Status | Assigned To | Notes |
|---------|----------|----------|---------------|-------------------|-----------------|--------|-------------|-------|
| TC-NEG-AUTH-001 | High | Input Validation | Registration with Invalid Email Formats | plainaddress, @missinglocalpart.com, missing@.domain, spaces in@email.com, toolong@verylongdomain.com | "Please enter valid email" error, Registration blocked, Real-time validation feedback | ⏸️ Pending | QA Team | Test on all email formats |
| TC-NEG-AUTH-002 | High | Password Policy | Weak Password Validation | "123", "password", "12345678", "" | "Weak" password indicator, Registration blocked, Specific requirements shown | ⏸️ Pending | QA Team | Verify all password rules |
| TC-NEG-AUTH-003 | Critical | Code Injection | SQL Injection in All Input Fields | '; DROP TABLE users; --, admin'/**/OR/**/1=1--, <script>alert('XSS')</script> | Input sanitized, Standard error messages, No code execution | ⏸️ Pending | Security Team | Test all input fields |
| TC-NEG-AUTH-004 | High | Rate Limiting | Brute Force Attack Simulation | 10+ rapid failed login attempts, Multiple IP addresses, Account lockout bypass | Account locked after 5 attempts, CAPTCHA after 3 attempts, IP rate limiting | ⏸️ Pending | Security Team | Simulate real attack |
| TC-NEG-AUTH-005 | Medium | Token Handling | Session Management Vulnerabilities | Expired JWT token, Modified session token, Multiple device conflicts | Auto logout on expiry, Invalid token rejection, Session conflict resolution | ⏸️ Pending | Security Team | Test token lifecycle |
| TC-NEG-CV-001 | High | Environmental | Extreme Lighting Conditions | Complete darkness, Direct sunlight, Rapidly changing lights, Colored lighting | Warning message displayed, Auto exposure adjustment, Graceful degradation, No false detections | ⏸️ Pending | AI Team | Test in real gym conditions |
| TC-NEG-CV-002 | High | Hardware | Camera Hardware Failures | Camera blocked during workout, Hardware failure mid-session, Permission revoked | Immediate failure detection, Clear notifications, Fallback to manual entry | ⏸️ Pending | Mobile Team | Test on multiple devices |
| TC-NEG-CV-003 | Critical | AI Classification | Invalid Exercise Movements | Random arm waving, Yoga poses, Cleaning activities, Dancing movements | No false classifications, >95% accuracy maintained, Non-exercise ignored | ⏸️ Pending | AI Team | Critical for user trust |
| TC-NEG-CV-004 | Medium | Multi-Person | Multiple People in Frame | Two people exercising, People walking behind, Crowded gym | Focus on primary user, Multi-person warning, User selection option | ⏸️ Pending | AI Team | Common gym scenario |
| TC-NEG-CV-005 | Medium | Incomplete Data | Partial Body Visibility | Only upper body visible, Person outside frame, Equipment blocking view | Position adjustment guidance, Partial detection warning, Reduced accuracy acceptable | ⏸️ Pending | AI Team | Edge case handling |
| TC-NEG-CV-006 | Low | Technical | Video Quality Issues | 240p resolution, Compressed video, Motion blur, Pixelated stream | Quality warning, Auto adjustment, Manual override options | ⏸️ Pending | Mobile Team | Low-end device support |
| TC-NEG-PERF-001 | High | Resource Limits | Memory Exhaustion | <2GB RAM, Multiple heavy apps, 3+ hour sessions, Storage filling | Memory optimization active, Low resource warnings, Auto session saving, Feature degradation | ⏸️ Pending | Performance Team | Test on low-end devices |
| TC-NEG-PERF-002 | High | Processing | CPU Overload Conditions | Older processors, Multiple AI models, Thermal throttling, Battery saver mode | Frame rate reduction, Processing adjustment, Performance mode options | ⏸️ Pending | Performance Team | Thermal testing needed |
| TC-NEG-PERF-003 | Medium | Storage | Storage Space Exhaustion | <100MB free, Video limits, Database limits, Cache overflow | Storage warnings, Auto cleanup, Compressed data, User prompts | ⏸️ Pending | Mobile Team | Storage management |
| TC-NEG-PERF-004 | Medium | Network | Connectivity Issues | Network loss mid-workout, Intermittent connectivity, <1 Mbps, DNS failures | Offline mode, Auto retry, Data queuing, Status indicators | ⏸️ Pending | Backend Team | Offline capability |
| TC-NEG-DATA-001 | High | Integrity | Database Corruption Scenarios | Corrupted history, Missing profile, Incomplete records, Timestamp issues | Validation & repair, Backup restore, Error recovery, Consistency maintenance | ⏸️ Pending | Backend Team | Data recovery testing |
| TC-NEG-DATA-002 | High | Sync Issues | Sync Conflicts and Failures | Multi-device edits, Timezone conflicts, Partial sync failures, Quota exceeded | Conflict resolution UI, Retry mechanisms, Backup verification | ⏸️ Pending | Backend Team | Multi-device testing |
| TC-NEG-DATA-003 | Medium | Data Transfer | Export/Import Failures | Corrupted exports, Unsupported formats, Large dataset timeouts, Malformed imports | File validation, Error reporting, Partial success handling, Format conversion | ⏸️ Pending | Backend Team | Data portability |
| TC-NEG-UI-001 | Medium | Orientation | Screen Rotation Issues | Rapid rotation, Orientation lock conflicts, UI overlapping, Camera distortion | Smooth transitions, Element repositioning, Maintained functionality | ⏸️ Pending | UI Team | Device rotation testing |
| TC-NEG-UI-002 | High | Accessibility | Accessibility Failures | Screen reader issues, High contrast mode, Large text handling, Color blindness | Full compliance, Alternative interactions, Clear feedback, Inclusive design | ⏸️ Pending | UI Team | Accessibility standards |
| TC-NEG-UI-003 | Medium | Localization | Internationalization Problems | RTL support, Text overflow, Date/time conflicts, Cultural variations | Proper text rendering, Dynamic sizing, Accurate localization | ⏸️ Pending | UI Team | Multi-language testing |
| TC-NEG-SEC-001 | Critical | Privacy | Data Privacy Violations | Unauthorized video access, Data exposure in logs, Camera interception, Biometric data access | Data encrypted, Privacy controls functional, No unauthorized access | ⏸️ Pending | Security Team | Privacy compliance |
| TC-NEG-SEC-002 | Critical | App Security | Security Bypass Attempts | Root/jailbreak bypass, Debug mode exploitation, API manipulation, Certificate bypass | Security measures intact, Tampering detection, API security, Code obfuscation | ⏸️ Pending | Security Team | Penetration testing |
| TC-NEG-INTEG-001 | Medium | App Conflicts | Third-Party App Conflicts | Competing apps, Camera conflicts, Battery optimization, Security app blocking | Resource sharing, Conflict resolution, Compatibility maintained | ⏸️ Pending | Integration Team | Real-world app conflicts |
| TC-NEG-INTEG-002 | Medium | OS Compatibility | Operating System Edge Cases | Beta OS, Minimum requirements, Permission changes, API deprecations | Compatibility, Graceful degradation, Clear requirements, Update paths | ⏸️ Pending | Platform Team | OS version matrix |
| TC-NEG-LOGIC-001 | High | Gaming System | Gamification Exploits | XP manipulation, Fake workout, Leaderboard manipulation, Achievement farming | Server-side validation, Anomaly detection, Fair play, Data integrity | ⏸️ Pending | Backend Team | Anti-cheat systems |
| TC-NEG-LOGIC-002 | Medium | Mathematical | Edge Case Calculations | Division by zero, Negative values, Integer overflow, Precision errors | Error handling, Boundary validation, Accurate operations | ⏸️ Pending | Backend Team | Mathematical validation |


**Legend**:  
- ⬜ = Not Tested  
- ✅ = Pass  
- ❌ = Fail  

---



## Market Analysis

TODO(Monika-mls): 

Conducting market analysis to study existing fitness tracking apps like Fitbod, Hevy, Strong, Train Fitness, Jefit etc. with a focus on their core features, technologies used (manual input, sensors, AI) and user experience. The goal is to identify key differentiators, usability gaps, and opportunities that GymBuddy can provide especially around passive workout tracking using computer vision.

Below is the table showing the market analysis of the existing fitness apps:

| App Name          | Key Features                        | Tech Used          | Weaknesses                  | What We Learn                                         |
| ----------------- | ----------------------------------- | ------------------ | --------------------------- | ----------------------------------------------------- |
| **Fitbod**        | AI workout plans, progress tracking | AI, manual logging | No passive tracking         | AI is helpful, but passive tracking could save effort |
| **Strong**        | Manual tracking, workout templates  | Manual input       | Tedious to log each set     | Users want automation                                 |
| **Hevy**          | Workout logging + social feed       | Manual             | No CV, too many taps        | Simplicity + automation can be key                    |
| **Train Fitness** | Auto rep counting with Apple Watch  | Motion sensors     | Only works with Apple Watch | GymBuddy should be platform-agnostic                  |
| **Jefit**         | Huge exercise library, tracking     | Manual input       | UI feels outdated           | Good database, weak usability                         |


---

 ## Survey Insights: AI-Based Gym Companion (42 respondents)

1. Audience Profile

100% are 18–24 years old → Your idea strongly resonates with young adults, likely students or early professionals.

They represent a group that’s tech-savvy, mobile-first, and open to trying AI-based fitness tools.

2. Current Gym Habits

69% go less than once a week → most are not consistent gym-goers.

Only 10 people (24%) go 3+ times a week.

👉 This means the real opportunity is in helping casual users build consistency and motivation, not just serving hardcore fitness enthusiasts.

3. Interest in an AI Gym Companion

62% rated 4 or 5 (high interest).

Only 6 people (14%) rated 1 or 2 (low interest).

👉 Clear demand: a majority are willing to try an AI-driven fitness companion. Skeptics are a minority.

4. Device Preference

Smartphone app (52%) is the top choice.

Smartwatch (31%) is also popular, showing interest in wearables.

Gym equipment screens (17%) are less important.

👉 Start with a mobile app as the core platform, with future potential for wearable integration.

5. Comfort with Data Tracking

73% rated 4 or 5 (comfortable).

27% rated 3 (neutral, not negative).

👉 Users are okay with AI tracking their workouts (sets, reps, heart rate, etc.), as long as privacy is clear and data is used meaningfully.

6. Gamification (Leaderboards)

79% find it motivating (Very/Somewhat).

Only 1 person said “Not motivating”.

👉 A leaderboard system works well for this demographic—but should allow opt-out for users who don’t want competition.

7. Open-Text Responses (Challenges & Goals)

Challenges mentioned: laziness, lack of motivation, not knowing proper form, time constraints.

Goals: getting fit, weight management, building strength, overall wellness.

👉 People don’t just need workouts—they need personalization, accountability, and motivation boosts.


**Product Backlog TestCases**: https://1drv.ms/x/c/a9a2a9cd25743ecf/EauZn082fslFqGgFkMvTvf8BLUyupGP-3yVscMjD2dw4mQ?e=StiSkS
#JATHIN-YANNA
# GymBuddy Report

## Key Links
- [Link to repo](#)
- [Link to the web app](#)
- [Link to the mobile app](#)
- [Link to the test report](#)
- (optional) [Link to the burndown sheet](#)

## Summary
- **Key changes**
  - <Describe key changes here>
- **Risks / issues**
  - <List any risks or issues here>

## Burndown Chart
![Burndown Chart](<path-to-burndown-chart-image>)

## Test Plan Report
- **Number of test cases:** <>
- **% passing:** <>

## Cross Team Meeting MoM
- <>


JATHINYANNA
# GymBuddy – Product Team Report (18 October 2025)

## Overview
This report summarizes today’s progress, challenges, next steps, and deployment responsibilities for the Product Team.

---

## Progress
- Coordinated updates across Mobile, Web & Cloud, and Data & AI teams.
- Verified current deployments and UI/UX alignment with design guidelines.
- Ensured datasets and AI modules are on track for integration.
- Maintained cross-team documentation and alignment for upcoming sprints.

---

## Challenges
- Minor sync and integration issues reported by Mobile and Data & AI teams.
- Database issues from Web & Cloud team impacting backend integration.
- Some API placeholders remain unconnected across modules.

---

## Next Steps
- Track backend integration completion for Mobile and Web & Cloud teams.
- Ensure Data & AI visualization module is deployed on Render within 2–3 days.
- Confirm dataset expansion and chatbot improvements.
- Monitor deployments and provide updates to stakeholders.

---

## Deployment Responsibilities

| Team        | Deployment Owner  | ETA / Status                               |
|------------|-----------------|--------------------------------------------|
| Mobile     | Advaith          | Backend integration ongoing                 |
| Web & Cloud| Anurag           | Web app live; backend integration pending  |
| Data & AI  | Data & AI Team   | Visualization module in 2–3 days; Chatbot live |
