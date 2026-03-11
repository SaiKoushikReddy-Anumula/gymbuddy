# Cross-Team Meeting Summary – GymBuddy
**Date:** 15 October 2025

## Overview
A cross-team meeting was conducted on 15th October 2025 to review the progress, challenges, and upcoming plans across all teams: Web & Cloud, Mobile, and Data & AI. The session aimed to ensure alignment in project development and discuss deployment responsibilities.

---

## Team Updates

### Web & Cloud Team
**Progress:**
- Completed the frontend and DB setup.
- The web app has been deployed to EC2 and the domain has been added: [http://gymbuddy.24ninjas.in](http://gymbuddy.24ninjas.in)
- Frontend developed using React (Vite) integrated with Material UI, connected with backend APIs.
- Backend built using Node.js, Express, and MongoDB, featuring JWT authentication and bcryptjs.
- Cloud services including MongoDB Atlas, DynamoDB (logs/metadata), and Redis caching configured successfully.
- Key modules such as video upload, workout logging, chat memory, and analytics are functional and optimized.

**Challenges:**
- Few technical issues faced in the DB as the initial database was lost.
- AI module integration is pending until Data & AI team finalizes datasets.
- Testing ongoing for corrupted file uploads, large dataset performance, and data export functionality.

**Next Steps:**
- Replace placeholders with APIs and complete backend integration.
- Validate end-to-end workflow and optimize backend for scalability, performance, and error handling.
- Conduct remaining tests and finalize CI/CD deployment pipelines.

**Deployment Responsibility:** Anurag

---

### Mobile Team
**Progress:**
- Frontend development completed and interface aligned with design guidelines.
- Web application successfully deployed.

**Challenges:**
- Encountered a few technical issues during backend integration, currently being addressed.

**Next Steps:**
- Replace placeholders with APIs and complete backend integration.

**Deployment Responsibility:** Advaith

---

### Data & AI Team
**Progress:**
- Python visualization code completed; deployment on Render scheduled within 2–3 days.
- Dataset with 250+ labeled workout samples prepared.
- SampleDataSet.xlsx finalized with key exercise details.
- Privacy filters (blur & mask) tested with ~90% accuracy.
- Chatbot live with text and voice interaction.

**Challenges:**
- Minor synchronization issues during data upload.

**Next Steps:**
- Deploy visualization module on Render.
- Expand dataset with diverse exercises.
- Improve chatbot context handling and feedback loop.

**Deployments:**
- Visualization tool scheduled on Render within 2–3 days.
- Chatbot already live and functional.

---

## Next Steps (Cross-Team)
1. **Mobile Team:** Replace placeholders with APIs and complete backend integration.
2. **Web & Cloud Team:** Complete AI upload integration, validate end-to-end workflow, optimize backend services, conduct remaining tests, and finalize CI/CD pipelines.
3. **Data & AI Team:** Deploy visualization module on Render, expand dataset, and improve chatbot functionality.

---

## Deployment Responsibilities

| Team | Scope |
|------|-------|
| Mobile | Backend integration, API linking, final app deployment |
| Web & Cloud | Backend deployment, cloud services, security enforcement |
| Data & AI | Dataset updates, AI model integration, visualization module deployment, chatbot |
