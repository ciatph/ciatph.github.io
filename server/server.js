const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 8080

// Enable Express app to serve vuejs-built SPA
app.use(express.static(path.join(__dirname, '..','dist')))

// Enable Express app to receive Get requests
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..','dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`))