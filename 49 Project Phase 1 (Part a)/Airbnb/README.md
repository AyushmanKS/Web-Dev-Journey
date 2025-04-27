
# 🌍 Wanderlust

**Wanderlust** is a full-stack web application where users can explore listings of beautiful places to stay, as well as add and manage their own listings.  
Built using **HTML**, **CSS**, **JavaScript**, **Express.js**, and **MongoDB**, Wanderlust offers a seamless experience for travelers and hosts alike.

---
![image](https://github.com/user-attachments/assets/effef83c-4386-4bf3-a9c2-1faa48c725de)


## 🚀 Features

- View a wide range of property listings
- Add new listings with details like title, description, location, and price
- Edit and delete your own listings
- Dynamic and responsive UI
- RESTful API design
- MongoDB database integration for persistent storage

---
![image](https://github.com/user-attachments/assets/8cc2ba2c-0900-4a5d-813a-3c2812441e8c)
![image](https://github.com/user-attachments/assets/f87fd73c-6458-4263-8591-533e15307ee0)


## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **Templating**: EJS 
- **Others**: REST APIs, Middleware for error handling

---

## 📂 Project Structure

```
Wanderlust/
│
├── public/            # Static assets (CSS, client-side JS, images)
│
├── views/             # EJS templates (optional)
│
├── models/            # Mongoose schemas
│
├── app.js             # Main server file
│
├── package.json       # NPM dependencies and scripts
│
└── README.md          # Project overview
```

---

## ⚙️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:

   ```
   DATABASE_URL=your_mongodb_connection_string
   PORT=8080
   ```

4. **Run the application**
   ```bash
   nodemon app.js
   ```

5. **Visit the app**  
   Open your browser and navigate to: [http://localhost:8080/listings](http://localhost:8080/listings)

---

## 🖼️ Screenshots

| Home Page | Add New Listing |
| :---: | :---: |
| ![Home Screenshot](link_to_image) | ![Add Listing Screenshot](link_to_image) |

*(Add screenshots if available)*

---

## 📌 Future Enhancements

- User authentication (login/signup)
- Reviews and ratings for listings
- Image uploads for listings
- Filtering and searching properties
- Interactive maps integration

---

## 🤝 Contributing

Contributions are welcome!  
If you'd like to contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Node.js and Express.js documentation
- MongoDB University tutorials
- MDN Web Docs (HTML, CSS, JS)

---
