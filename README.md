# DineEase 🍽️  

DineEase is a **MERN-based cafeteria management system** designed to **streamline food ordering**, **optimize kitchen operations**, and **enhance the dining experience**. It features **secure authentication** and a seamless **user interface** for **Admins, Merchants, and Customers**.  

---

# 🚀 Features  

### **Frontend (React + Vite + Tailwind CSS)**  
- ✅ **Modern UI** with an intuitive user experience.  
- 🛒 **Cart Management** for adding and modifying orders.  
- 🏷️ **Menu Display** with dynamic dish categories.  
- ⚡ **State Management** using Redux.  

### **Backend (Node.js + Express + MongoDB)**  
- 🍽️ **Dishes & Categories API** to manage menu items.  
- ⏳ **Caching & Performance Optimization**.  

### **Auth Backend (JWT + Role-Based Access Control)**  
- 🔑 **JWT-based Authentication** with Refresh Tokens.  
- 🛂 **Role-Based Access** for Admin, Merchant, and Customer.  
- 🔄 **Token Refresh Mechanism** for seamless logins.  
- 🔐 **Secure Password Hashing** with bcrypt.  

---

# 📸 Screenshot

### **Homepage**  
![image](https://github.com/user-attachments/assets/232452d7-224c-4b8f-8215-ffa940702c5c)


---

# 🛠️ Installation  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/shrey-s12/DineEase-Frontend.git
git clone https://github.com/shrey-s12/DineEase-Backend.git
git clone https://github.com/shrey-s12/DineEase-auth-Backend.git

```

### **2️⃣ Setup the Backend**
```sh
  cd DineEase-Backend
  npm install
  npm run dev
```
Make sure MongoDB is running locally or update your MONGO_URI in .env.

### **3️⃣ Setup the Auth Backend**
```sh
  cd DineEase-auth-Backend
  npm install
  npm run auth
```

### **4️⃣ Setup the Frontend**
```sh
  cd DineEase-Frontend
  npm install
  npm run dev
```

# 🌐 API Routes

### **Backend API (`/`)**

| Route    | Method | Description    |
|----------|--------|---------------|
| `/counter` | GET | Fetch counters |
| `/dish` | GET | Fetch dishes |
| `/user` | GET | Fetch users |
| `/cart` | GET | Fetch cart |

### **Auth API (`/auth`)**

| Route      | Method | Description          |
|------------|--------|----------------------|
| `/login`   | POST   | User Login           |
| `/register` | POST   | User Registration    |
| `/token`   | POST   | Refresh Access Token |
| `/logout`  | DELETE | User Logout          |


---
## 🚀 Deployment  

### Frontend (Vercel)  
- **Live Deployment**  
  ```sh
  npm run build
  vercel deploy
  ``` 

### Backend (Render)
- git push render main

---
# 🎯 Future Enhancements

- 📱 Mobile App using React Native.

- 🍱 AI-Powered Meal Recommendations.

- 💳 Integration with Payment Gateways.

- 🎁 Loyalty & Rewards System.

---
### 👨‍💻 Contributor

Shrey Singhal - GitHub

---
## 📝 License

This project is licensed under the MIT License.

--- 
### ⭐ Show Some Love

If you like this project, don't forget to star the repo! ⭐
