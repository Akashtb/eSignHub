# 🖊️ EsignHub - Digital Letter Submission System

**EsignHub** is a MERN Stack-based web application designed to digitize the process of submitting and approving formal letters or permission requests within academic institutions. It ensures role-based access, transparency, and paperless communication among different user levels.

---

## 👥 User Roles & Permissions

- **Principal**  
  - Full CRUD access to all users: HOD, Tutor, and Student.

- **HOD (Head of Department)**  
  - CRUD access to **Students** only.

- **Tutor**  
  - Can view and respond to student request letters.

- **Student**  
  - Can send digital request letters to authorized personnel (Tutor, HOD, or Principal).
  - View the status (Pending / Accepted / Rejected) of their requests.

---

## 🔄 Request Approval Workflow

1. **Student** submits a request letter to an authorized staff member.
2. **Authorized user** (Tutor/HOD/Principal) reviews the request.
3. Upon **acceptance**:
   - A **random unique code** is generated and stored in the database.
   - A **QR Code** is created that encodes this unique code.
   - When the QR code is scanned, the code is displayed on the scanning device for verification.

4. If **rejected**, the student is notified.


---

## 🚀 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT (JSON Web Tokens)  
- **Additional Features**:
  - Role-Based Access Control Middleware
  - QR Code Generator & Scanner
  - Request status tracking system
  - Realtime feature using socket.io

---

## ⚙️ Installation

1. Clone the repo  
   git clone https://github.com/Akashtb/eSignHub.git
   
3. cd esignhub
