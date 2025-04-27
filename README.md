# Direction Clinic Management System

A modern web application for managing clinic operations, appointments, and patient records efficiently.

## Features

- **User Authentication**
  - Secure login and registration system
  - Role-based access control (Doctor and Receptionist roles)
  - Protected routes and authenticated sessions

- **Patient Management**
  - Patient registration and record keeping
  - Medical history tracking
  - Appointment scheduling

- **Billing System**
  - Generate and manage invoices
  - Payment tracking
  - Financial reporting

- **Prescription Management**
  - Digital prescription creation
  - Medication tracking
  - Treatment history

## Tech Stack

- **Frontend**
  - React.js with TypeScript
  - Tailwind CSS for styling
  - React Router for navigation

- **Backend & Database**
  - Firebase Authentication
  - Firebase Firestore
  - Real-time data synchronization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/MalharBhosale/Clinic-Management-Stem.git
cd Clinic-Management-Stem
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Create a `.env` file in the root directory
- Add your Firebase configuration

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── firebase/       # Firebase configuration
├── pages/          # Main application pages
├── services/       # Business logic and API calls
└── types/          # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.