# medify.me

medify.me is a comprehensive healthcare web application designed to provide virtual consultations with certified doctors, assist with mental health, and enhance user understanding of prescriptions and product consumption using AI. It prioritizes user health by providing timely advice, connections to professionals, and AI-driven insights.

## Features

1. **Virtual Doctor Consultations**:
   - Connect with certified doctors for online consultations.
   - Receive real-time advice and guidance.

2. **Mental Health Assistance**:
   - Access mental health resources and professional support.

3. **Diagnosis Assistance**:
   - Provide a list of precautions and potential next steps for symptom management.
   - Alerts for serious conditions with recommendations to connect with a doctor.

4. **Prescription Scanner**:
   - Scan prescriptions to translate medical terminology into user-friendly language.

5. **Product Health Scanner**:
   - Scan products (e.g., food, lifestyle items) to determine their suitability for the user’s health.
   - AI-driven analysis of product impact based on user’s health profile.

## Tech Stack

### Frontend:
- **React**
- **TypeScript**
- **CSS**

### Backend:
- **Node.js** with **Express**
- **MongoDB** (for unstructured health data)
- **SQL** (for structured user and consultation data)

### AI Integration:
- AI models for prescription decoding and product suitability analysis (e.g., TensorFlow.js or external AI APIs).

##Expected Screens:
- Home Screen
- Sign-Up and Login Screen (for user and Doctor)
- Chatbot Screen
- Video Consultation with doctor
- Symptoms detector screen
- Prescription scanner screen
- 

## Folder Structure
```
medify.me/
|-- client/
|   |-- public/
|   |-- src/
|       |-- components/
|       |-- pages/
|       |-- services/
|       |-- types/
|-- backend/
|   |-- models/
|   |-- routes/
|   |-- controllers/
|   |-- services/
|   |-- db/
|-- docs/
|-- tests/
|-- .env
|-- package.json
|-- README.md
```

## Installation

### Prerequisites:
1. **Node.js** and **npm** installed on your machine.
2. **MongoDB** and **SQL database** setup.

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medify.me.git
   ```
2. Navigate to the project folder:
   ```bash
   cd redR/client
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install
   cd ../backend
   npm install
   ```
4. Set up environment variables in a `.env` file (refer to `.env.example`).
5. Start the development server:
   - Frontend: `npm start` in the `client/` directory.
   - Backend: `npm start` in the `backend/` directory.

## Contribution Guidelines

1. Fork the repository and create your branch:
   ```bash
   git checkout -b feature-name
   ```
2. Commit changes with meaningful messages:
   ```bash
   git commit -m "Added new feature X"
   ```
3. Push to your branch and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
