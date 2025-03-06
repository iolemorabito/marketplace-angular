# 🛍 MyMarketplace

## 🌟 Overview  
MyMarketplace is an e-commerce web application developed with **Angular 13** and **TypeScript**, featuring a **user-friendly interface**, **admin management**, and **secure authentication system**. Users can **browse**, **add products to their cart**, and **manage orders**, while admins have special privileges to manage users and inventory.

## 🚀 Features  
### 🔹 General Users  
- 🛒 **Add products to the cart** with quantity selection  
- 💳 **Checkout system** (simulated)  
- 🔐 **User authentication** (Registration & Login)  
- 🔄 **Persistent cart per user**  

### 🔹 Admin Panel  
- 🛠 **Manage users** (view & delete accounts)  
- 📦 **Manage products** (delete products but not purchase them)  
- 🔑 **Exclusive admin access** (default admin: `mkplace@admin.it`, password: `Mkplace123*`)  

### 🔹 UI & User Experience  
- 🎨 **Responsive design** with modern styles  
- 📊 **Dynamic product filtering** by category  
- 🌙 **Toastr notifications** for actions (add, remove, error handling)  

## 🏗️ Tech Stack  
- **Frontend**: Angular 13, TypeScript, RxJS  
- **State Management**: BehaviorSubject (Reactive Programming)  
- **Storage**: LocalStorage for persistence  
- **UI Components**: HTML, CSS, Bootstrap  

## 🔧 Installation & Setup  
To run the project locally, follow these steps:  

1️⃣ Clone the repository  
- git clone https://github.com/your-username/MyMarketplace.git
- cd MyMarketplace 

2️⃣ Install dependencies
- npm install
3️⃣ Run the project
- ng serve
- Visit http://localhost:4200 in your browser.

![Screenshot 2025-03-06 111338](https://github.com/user-attachments/assets/27e6cf55-403a-4903-95dc-8527ba104f8e)
![Screenshot 2025-03-06 112021](https://github.com/user-attachments/assets/b32fa039-08c5-40e6-9e40-3aca0d39bdce)
![Screenshot 2025-03-06 112121](https://github.com/user-attachments/assets/abc03eb9-bb57-43da-8070-d4d2cbe4cca9)


🛠 Future Improvements
🔹 Implement a real backend (currently, LocalStorage is used)
🔹 Add product checkout with payment integration
🔹 Improve product search & filtering

🤝 Contributing
Want to improve MyMarketplace? Fork the repo, make your changes, and submit a PR!
