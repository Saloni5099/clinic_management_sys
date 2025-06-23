# Clinic-Management
A Seemless communication with Doctor and Receptionist Using MERN Stack

## Table of Contents

- [Installation](#installation)
- [Workflow](#workflow)
- [Usage](#usage)
- [Features](#features)

# Installation
1.Clone the repository:

    git clone https://github.com/Bhaski47/Clinic-Management

2.Navigate to the project folder:

    cd Clinic-Management

3.Navigate to the frontend folder:

    cd client

4.Navigate to the backend folder:

    cd server

5.Install dependencies:

    npm install

6.Set up the MongoDB database:
    Create a MongoDB Atlas account or set up a local MongoDB instance.
    Update the MongoDB connection string in the server/db.js file.

Start the application:
  You need to start the application in both server and client simultaneously
  By using the following command in both client and server folder
    npm start

# Workflow

### 1. Patient Registration and Token Generation

- The patient visits the receptionist and provides necessary details.
- The receptionist generates a unique token ID for the patient.

### 2. Doctor Consultation

- The doctor accesses the patient's token ID to view previous prescriptions and medical history.
- After consultation, the doctor provides a new prescription.

### 3. Billing

- The receptionist performs billing using the patient's token ID.
- Billing includes details of the prescribed medication and doctor's consultation.

# Usage

### 1. Receptionist Login:

- Login to the receptionist panel using the credentials:
  - Email: `receptionist@careclinic.com`
  - Password: `receptionist@careclinic.com`
- Navigate to the patient registration section.

### 2. Generate Token:

- Register new patients by entering their details.
- Generate a unique token ID for the patient.
- Provide patients with the generated token ID for future consultations.

### 3. Doctor Login:

- Access the doctor's panel with the following credentials:
  - Email: `doctor@careclinic.com`
  - Password: `doctor@careclinic.com`

### 4. Retrieve Patient Information:

- Enter the patient's token ID to access their medical history and previous prescriptions.
- Consult with the patient and provide a new prescription.

### 5. Prescription Details:

- The prescription includes details about prescribed medications, recommended treatments, and any additional notes.

### 6. Receptionist Billing:

- Login to the receptionist panel.
- Retrieve patient details using the token ID.
- Review the doctor's prescribed information and patient's medical history.
- Enter billing details, including the consultation fee and prescribed medications cost.
- Confirm the billing transaction.

# Features

1. **Patient Records**
   - Maintain comprehensive electronic health records for each patient.
   - Include information about allergies, previous illnesses, and surgeries.

2. **Multi-User Roles**
   - Differentiate between roles such as receptionist, and doctor.
   - Assigned specific permissions and access levels based on roles.

3. **Prescription History**
   - Maintain a detailed history of prescriptions for each patient.

## Addtional Features
- The Patient can give the phone to retrieve the details so that if the patient came at night then he can visit next day with same token id
- If the Token id is lost then the patient can provide the phone number to retrive the all details
