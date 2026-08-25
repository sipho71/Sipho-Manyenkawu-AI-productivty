# WorkMate AI Assistant

Build a modern, professional web application called WorkMate AI.

PROJECT PURPOSE

WorkMate AI is an AI-powered workplace productivity assistant designed to help users complete common professional tasks faster and more effectively.

The application will eventually include:

Smart Email Generator

Meeting Intelligence

AI Task Planner

AI Research Assistant

WorkMate AI Chat

For this first stage, build the complete frontend foundation and navigation. Do NOT implement the actual AI API integration yet.

TARGET USERS

The application should be suitable for:

Students and graduates

Job seekers

Employees

Professionals

Small-business owners

Career switchers

DESIGN DIRECTION

Create a polished SaaS-style interface.

Design goals:

Modern

Professional

Minimal

Clean

Premium

Easy to navigate

Responsive on desktop, tablet and mobile

Avoid making it look like a generic AI chatbot.

Use a consistent design system throughout the application with:

Professional typography

Clear visual hierarchy

Rounded cards

Subtle shadows

Smooth hover states

Appropriate icons

Accessible contrast

Spacious layouts

APPLICATION STRUCTURE

Create the following pages:

Public pages

Landing Page

Login

Sign Up

Authenticated application

Create an application dashboard with a persistent sidebar navigation.

Sidebar items:

Dashboard

Smart Email

Meeting Intelligence

Task Planner

Research Assistant

WorkMate Chat

Settings

Include a user profile area at the bottom of the sidebar.

LANDING PAGE

Create a professional landing page for WorkMate AI.

Hero section:

Headline:
"Work Smarter. Get More Done."

Supporting text:
"WorkMate AI brings powerful AI productivity tools into one intelligent workspace."

Primary button:
"Get Started"

Secondary button:
"Explore Features"

Include a feature section displaying the five core capabilities:

Smart Email
Generate professional emails based on context, audience and tone.

Meeting Intelligence
Turn meeting notes into summaries, decisions and actionable tasks.

Task Planner
Turn goals into structured and prioritized plans.

Research Assistant
Understand complex information faster with AI-powered research assistance.

WorkMate Chat
Ask an AI workplace assistant for help with professional tasks.

Include a section explaining the workflow:

"Capture → Understand → Plan → Act"

Include a Responsible AI section explaining that AI-generated content should be reviewed before professional use.

Finish with a strong call-to-action.

AUTHENTICATION UI

Create Login and Sign Up pages.

The forms should contain:

Email

Password

Confirm password on Sign Up

Include appropriate validation states.

For now, authentication can be represented in the frontend. We will connect Supabase authentication in a later stage.

DASHBOARD

Create a professional dashboard.

Header:

"Good afternoon 👋"

Supporting text:

"What would you like to accomplish today?"

Create a prominent AI assistant input area:

"Ask WorkMate anything..."

Below it, create feature cards for:

Smart Email
Meeting Intelligence
Task Planner
Research Assistant
WorkMate Chat

Each card should contain:

Icon

Feature name

Short description

Action button

Create a "Recent Activity" section.

Create a "Today's Tasks" section showing example placeholder tasks.

Create a small productivity summary section containing:

Tasks completed

AI interactions

Meetings processed

Time saved

Use placeholder data for now.

FEATURE PAGES

Create separate pages for each feature.

Smart Email

Create the UI for:

Recipient/audience

Purpose

Context

Tone selector

Length selector

Generate Email button

Include an empty result/preview area.

Meeting Intelligence

Create:

Large meeting notes text area

Meeting title

Date

Participants

Analyze Meeting button

Result area should eventually display:

Summary

Key decisions

Action items

Deadlines

Unresolved issues

Use placeholder content for now.

Task Planner

Create:

Goal input

Available hours

Deadline

Priority

Generate Plan button

Create a task list interface with:

Task

Priority

Deadline

Status

Use placeholder data initially.

Research Assistant

Create:

Research question input

Topic/context input

Research depth selector

Generate Research button

Create a result area containing:

Summary

Key insights

Recommendations

Sources placeholder

Do not implement live web research yet.

WorkMate Chat

Create a modern AI chat interface.

Include:

Conversation area

User messages

AI messages

Text input

Send button

New conversation button

Use placeholder conversation data.

SETTINGS

Create a settings page with sections for:

Profile

Name

Email

Preferences

Default AI tone

Default response length

Responsible AI

AI-generated content disclaimer

Account

Log out

IMPORTANT ARCHITECTURE REQUIREMENT

Structure the project cleanly so that we can later connect:

Lovable frontend
↓
Supabase
↓
Supabase Edge Functions
↓
AI API

Do not expose or hardcode any API keys in frontend code.

Do not implement fake API calls that pretend to be real AI functionality.

Use clean reusable components and keep the application architecture easy to extend.

RESPONSIVENESS

The entire application must work properly on:

Desktop

Tablet

Mobile

The sidebar should become a mobile-friendly navigation system on smaller screens.

IMPORTANT

Focus on building a high-quality frontend foundation first.

Do not add unnecessary features outside the project scope.

Do not implement the AI API yet.

Do not hardcode API keys.

After building the application, ensure all navigation links work and every page can be accessed from the dashboard.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/89bde41c-7046-41f8-b2f1-246fba9a615a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
