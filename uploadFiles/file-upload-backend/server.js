const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

const users = []; // In-memory user storage (for simplicity)
const JWT_SECRET = 'your_secret_key';

app.use(express.json());

// Endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send('User registered');
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Endpoint to handle file upload
app.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, `uploads/${req.file.originalname}`);

  // Validate file type (for example, allow only images)
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    fs.unlinkSync(tempPath); // Delete the temporary file
    return res.status(400).send('Invalid file type. Only JPG, JPEG, and PNG files are allowed.');
  }

  // Move file to final destination
  fs.rename(tempPath, targetPath, err => {
    if (err) return res.status(500).send('Error uploading file');
    res.status(200).send('File uploaded successfully');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
