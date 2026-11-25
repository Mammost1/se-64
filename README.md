# KU Scholarship — scholarship application system

A course project (Software Engineering, 2021–2022 academic year) for managing university
scholarship applications end to end: students apply, admins publish scholarships and shortlist
applicants, and committee members score interviews.

## Features

- **Students:** sign in with a university Google account, keep a profile (personal, family and
  income details), browse open scholarships, apply with document uploads, and follow the status
  of each application (recruitment, interview, announcement).
- **Admins:** create and edit scholarships, review applicants, select who goes to interview,
  schedule interviews, assign committee members, publish the pass list, and edit the news and
  banner images on the home page.
- **Committee:** score interviews per applicant; the admin sees per-member and total scores.

## Stack

- Frontend: React (Create React App), React Router, React Bootstrap, Google sign-in.
- Backend: Node.js + Express, MySQL (`mysql`), JWT sessions, bcrypt, Multer for uploads,
  Google token verification (`google-auth-library`).
- Database: MySQL / MariaDB; the schema is in `fileMysql/schema.sql` (no data included).

## Run locally

Requirements: Node.js 20.6+ and MySQL or MariaDB.

```sh
# 1. database
mysql -u root -p -e "CREATE DATABASE employeeSystem CHARACTER SET utf8mb4"
mysql -u root -p employeeSystem < fileMysql/schema.sql

# 2. backend
cd server
cp .env.example .env        # fill in DB_PASSWORD, JWT_SECRET and CLIENT_ID
npm install
node --env-file=.env index.js

# 3. frontend (port 3000)
cd ..
cp .env.example .env        # fill in REACT_APP_GOOGLE_CLIENT_ID
npm install
npm start
```

Google sign-in needs your own OAuth client ID from the Google Cloud console, with
`http://localhost:3000` as an authorised JavaScript origin. Accounts and roles live in the
`users` table; add an admin row there to manage scholarships.

## Notes

- A student project kept for reference; it has not been hardened for production use.
- The sample profile in `src/Data/dataProfile.js` is fictional.
