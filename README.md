# YouTube Summarizer

A TypeScript application that uses Firebase and AI to generate concise summaries of YouTube videos. Simply input a YouTube video URL, and get a short, clear summary of the content — saving time and improving productivity.

---

## Features
- Input YouTube video URLs to get summaries.
- Extracts video transcripts via YouTube API.
- AI-powered text summarization for key points.
- Firebase Authentication for secure user login.
- Firestore database to save user data and summaries.
- Clean, intuitive UI.
- Web-based application with responsive design.

---

## Technology Stack
- **TypeScript:** Strongly-typed programming language for web development.
- **React:** Front-end library for building user interfaces.
- **Node.js:** JavaScript runtime for server-side functionality.
- **Express:** Web application framework for Node.js.
- **Firebase:** Backend services including Authentication, Firestore, and Hosting.
- **YouTube Data API:** Fetch video captions and metadata.
- **OpenAI API:** Summarize transcripts into concise text.

---

## Getting Started

### Prerequisites
- Node.js installed ([Node.js installation guide](https://nodejs.org/))
- Firebase project setup ([Firebase Console](https://console.firebase.google.com/))
- YouTube Data API key ([YouTube API guide](https://developers.google.com/youtube/v3))
- OpenAI API key for the summarization functionality

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/Homelander98/youtube-summarizer.git
   cd youtube-summarizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your API keys:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key
   OPENAI_API_KEY=your_openai_api_key
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage
1. Navigate to the application in your browser
2. Login with your credentials
3. Paste a YouTube video URL in the input field
4. Click "Summarize" and wait for the summary to be generated
5. View and save your video summaries for future reference

---

## Project Structure
```
youtube-summarizer/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Application entry point
├── public/             # Static assets
├── .env                # Environment variables (not tracked by git)
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

## License
MIT

---

## Acknowledgements
- [YouTube API](https://developers.google.com/youtube/v3)
- [OpenAI](https://openai.com/)
- [Firebase](https://firebase.google.com/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
