# **Eatoes – Restaurant Admin Dashboard**

A full-stack **Restaurant Admin Dashboard** built as part of the **Eatoes Intern Technical Assessment**.  
This application allows restaurant owners/admins to manage menu items, track availability, and monitor customer orders in real time.

---

## **Live Demo**

* **Frontend (Netlify):**  
  [https://eatoes-admin-dashboards.netlify.app/](https://eatoes-admin-dashboards.netlify.app/)  
* **Backend API (Render):**  
  [https://eatoes-backend-rwg8.onrender.com](https://eatoes-backend-rwg8.onrender.com)

---

## **Project Overview**

The goal of this project is to demonstrate real-world **full-stack development skills** using the MERN stack, including:

* RESTful API design  
* MongoDB schema design & aggregation  
* React state management  
* Performance optimization (debouncing, optimistic UI)  
* Production deployment

---

## **Tech Stack**

### **Frontend**

* React 18  
* Axios  
* Custom Hooks (`useDebounce`)  
* CSS (inline styling for simplicity)

### **Backend**

* Node.js  
* Express.js  
* MongoDB (Atlas)  
* Mongoose

### **Deployment**

* **Frontend:** Netlify  
* **Backend:** Render  
* **Database:** MongoDB Atlas (Free Tier)

---

## **Features Implemented**

### **Menu Management**

* View all menu items  
* Search menu items (debounced – 300ms)  
* Toggle availability with **optimistic UI**  
* Category & price display  
* Real-time updates from backend

### **Orders Dashboard**

* View customer orders  
* Filter orders by status  
* Pagination support  
* Update order status (Pending → Preparing → Ready → Delivered)  
* Populated menu item details in orders

### **Backend APIs**

* RESTful APIs for menu & orders  
* MongoDB indexing & text search  
* Aggregation pipeline for top-selling items  
* Validation & error handling

### **Performance & UX**

* Debounced search to reduce API calls  
* Optimistic UI updates for fast feedback  
* Loading & error states handled properly

---

## 

## **Project Structure**

`eatoes-admin-dashboard/`  
`├── client/`  
`│   ├── src/`  
`│   │   ├── pages/`  
`│   │   │   ├── MenuManagement.jsx`  
`│   │   │   └── OrdersDashboard.jsx`  
`│   │   ├── hooks/`  
`│   │   │   └── useDebounce.js`  
`│   │   ├── services/`  
`│   │   │   └── api.js`  
`│   │   ├── App.js`  
`│   │   └── index.js`  
`│   └── public/`  
`│       └── _redirects`  
`│`  
`├── server/`  
`│   ├── config/`  
`│   │   └── db.js`  
`│   ├── models/`  
`│   │   ├── MenuItem.js`  
`│   │   └── Order.js`  
`│   ├── controllers/`  
`│   ├── routes/`  
`│   ├── server.js`  
`│   └── app.js`  
`│`  
`└── README.md`

---

## **API Endpoints**

### **Menu APIs**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu/search?q=` | Search menu items |
| GET | `/api/menu/:id` | Get menu item by ID |
| POST | `/api/menu` | Create menu item |
| PUT | `/api/menu/:id` | Update menu item |
| DELETE | `/api/menu/:id` | Delete menu item |
| PATCH | `/api/menu/:id/availability` | Toggle availability |

### **Order APIs**

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | `/api/orders` | Get all orders (pagination, filter) |
| GET | `/api/orders/:id` | Get order by ID |
| POST | `/api/orders` | Create new order |
| PATCH | `/api/orders/:id/status` | Update order status |

---

## **Sample Data**

* **15 menu items** across Appetizer, Main Course, Dessert, Beverage  
* **Multiple orders** with different statuses  
* Seed script used for consistent testing

---

## **Environment Variables**

### **Backend (`server/.env`)**

`MONGODB_URI=your_mongodb_atlas_uri`  
`PORT=5000`

### **Frontend (Netlify)**

`REACT_APP_API_URL=https://your-backend.onrender.com`

---

## **Challenges Faced & Solutions**

### **1\. Netlify CI Build Failures**

* **Issue:** ESLint warnings treated as errors  
* **Solution:** Fixed `useEffect` dependency issues using `useCallback`

### **2\. API 404 Errors in Production**

* **Issue:** Missing `/api` prefix in frontend calls  
* **Solution:** Normalized API base URL to always include `/api`

### **3\. Render Cold Start**

* **Issue:** Backend sleeping on free tier  
* **Solution:** Handled retries and validated backend availability

---

## **Screenshots** 

You can add screenshots of:

* Menu Management Page  
* Orders Dashboard

---

## **Conclusion**

This project demonstrates the ability to:

* Build and deploy a **production-ready MERN application**  
* Handle real-world debugging and deployment issues  
* Follow clean architecture and best practices

---

## **Author**

**Gowtham**  
GitHub: [https://github.com/Tinku070](https://github.com/Tinku070)

