
const express = require('express');
const app = express();
const port = 3001;

app.get('/api/data', (req, res) => {
    res.json({
        success: true,
        data: {
            name: "John Doe",
            permissions: {
                read: true,
                write: false
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Mock API server running at http://localhost:${port}`);
});
