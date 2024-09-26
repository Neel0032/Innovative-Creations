const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle URL submission and take screenshot
app.post('/screenshot', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Launch Puppeteer to take a screenshot
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Convert screenshot to Base64
        const screenshot = await page.screenshot({ encoding: 'base64' });
        await browser.close();

        // Return the screenshot as a Base64 string
        res.send(`data:image/png;base64,${screenshot}`);
    } catch (err) {
        res.status(500).send('Failed to take screenshot: ' + err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});