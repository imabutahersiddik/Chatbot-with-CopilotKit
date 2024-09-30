# Chatbot with CopilotKit

Welcome to the **Chatbot with CopilotKit** repository! This project showcases an AI-powered chatbot built using React for the frontend and Flask for the backend, integrated with CopilotKit for enhanced user interaction. Users can engage in conversations, save their chat history, and manage custom prompts.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AI Integration**: Utilizes an AI model (e.g., Gemini AI) to generate responses.
- **Recent Conversations**: Displays saved conversations in a sidebar for easy access.
- **Custom Prompts**: Users can add, delete, and search through custom prompts.
- **Local Storage**: Saves chat history and prompts in local storage for persistence.
- **Responsive Design**: Aesthetic UI that adapts to different screen sizes.

## Technologies Used

- **Frontend**: 
  - React
  - CopilotKit
  - Axios (for API calls)

- **Backend**:
  - Flask
  - OpenAI or Gemini API (for AI responses)

- **Styling**:
  - CSS

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imabutahersiddik/Chatbot-with-CopilotKit.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Chatbot-with-CopilotKit
   ```

3. **Install dependencies for the frontend**:

   ```bash
   cd chatbot-frontend
   npm install
   ```

4. **Install dependencies for the backend**:

   ```bash
   cd chatbot-backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install Flask flask-cors requests
   ```

5. **Set up your environment variables** (e.g., API keys) as needed.

## Usage

1. **Start the Flask backend**:

   Navigate to the `chatbot-backend` directory and run:

   ```bash
   python app.py
   ```

2. **Start the React frontend**:

   Navigate to the `chatbot-frontend` directory and run:

   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to interact with the chatbot.

## Contributing

Contributions are welcome! If you have suggestions for improvements or features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
