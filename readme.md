# Task Manager with Voice Calling

This is a task management system that includes a voice calling feature using Twilio. The system allows users to create tasks, manage subtasks, and receive voice calls based on task due dates and user priorities.

## Features

- **Task Management:**
  - Create tasks with titles, descriptions, and due dates.
  - Create subtasks for each task.

- **User Management:**
  - Assign priorities to users.
  - Receive voice calls based on task due dates and user priorities.

- **Voice Calling:**
  - Twilio integration for making voice calls.
  - Calls users based on task due dates and user priorities.
  - Ensures that the next user is called only if the previous user does not attend the call.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Twilio

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Configure Twilio:**
    - Obtain your Twilio Account SID and Auth Token.
    - Replace the placeholders in the code with your Twilio credentials.

4. **Configure MongoDB:**
    - Set up a MongoDB database.
    - Update the connection string in the code with your MongoDB URI.

5. **Run the Application:**
    ```bash
    npm start
    ```

6. **Access the Application:**
    - Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

```bash
# Create Task
POST /api/tasks

# Create Subtask
POST /api/subtasks

# Get User Tasks
GET /api/tasks

# Get User Subtasks
GET /api/tasks/:taskId/subtasks

# Update Task
PUT /api/tasks/:taskId

# Update Subtask
PUT /api/subtasks/:subtaskId

# Delete Task
DELETE /api/tasks/:taskId

# Delete Subtask
DELETE /api/subtasks/:subtaskId

```

## Cron Jobs

- **Change Task Priority:**
  - Changes priority based on task due dates.

- **Voice Calling:**
  - Calls users based on task due dates and user priorities.