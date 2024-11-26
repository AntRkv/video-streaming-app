# Video Streaming App

This is a simple video streaming application where users can upload, view, edit, and delete videos. It is built using React for the frontend and Node.js with Express for the backend. The app also utilizes MongoDB for storing video data.

## Features

- **Video Upload**: Users can upload videos with titles, descriptions, and URLs.
- **View Videos**: Users can view a list of uploaded videos.
- **Edit Video**: Users can edit video details.
- **Delete Video**: Users can delete videos from the list.
- **Authentication**: Users can log in and log out using JWT tokens.

## Technologies Used

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## Installation

Follow these steps to set up the project locally.

### Backend Setup

1. **Clone the repository**:
   git clone https://github.com/your-username/video-streaming-app.git

2. **Navigate to the backend folder**:
    cd video-streaming-app/backend

3. **Install dependencies**:
    .npm install

4.  **Create a .env file in the backend folder and add your environment variables**:
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000

5. **Start the backend server**:
    npm start
    The backend should now be running at http://localhost:5000.

6. **Frontend Setup**:
    Navigate to the frontend folder:
    cd video-streaming-app/frontend

7. **Install dependencies**:
    npm install

8. **Create a .env file in the frontend folder and add the backend API URL**:
    REACT_APP_API_URL=http://localhost:3000/api

9. **Start the frontend server**:
   npm start
   The frontend should now be running at http://localhost:3000.

# Usage

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the app.

- **Register** a new account or log in using existing credentials.
- **Upload**, **view**, **edit**, and **delete** videos using the app’s interface.

---

# API Endpoints

## User Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a JWT token.

## Videos

- `GET /api/videos`: Get all videos.
- `GET /api/videos/:id`: Get a single video by ID.
- `POST /api/videos`: Upload a new video.
- `PUT /api/videos/:id`: Edit a video.
- `DELETE /api/videos/:id`: Delete a video.


# Contributing

1. **Fork the repository**.

2. **Create a new branch**:
   git checkout -b feature/your-feature-name

3. **Commit your changes**
 (git commit -am 'Add new feature').

4. **Push to the branch**
(git push origin feature/your-feature-name).

**Create a new Pull Request.**



## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
