const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.API_PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory tickets placeholder
let tickets = [
  { id: 1, subject: 'Login issue', status: 'open', body: 'Cannot log into my account.' },
  { id: 2, subject: 'Billing error', status: 'pending', body: 'Charged twice for my subscription.' }
];

// GET /tickets – list tickets (optionally filter by status)
app.get('/tickets', (req, res) => {
  const { status } = req.query;
  if (status) {
    return res.json(tickets.filter((t) => t.status === status));
  }
  res.json(tickets);
});

// POST /tickets/:id/reply – send a reply (just updates status)
app.post('/tickets/:id/reply', (req, res) => {
  const { id } = req.params;
  const ticket = tickets.find((t) => String(t.id) === id);
  if (!ticket) return res.status(404).json({ error: 'Not found' });
  ticket.status = 'closed';
  res.json({ success: true, ticket });
});

// GET /tickets/:id/suggest – get AI suggestion for a reply
app.get('/tickets/:id/suggest', async (req, res) => {
  const { id } = req.params;
  const ticket = tickets.find((t) => String(t.id) === id);
  if (!ticket) return res.status(404).json({ error: 'Not found' });
  try {
    const response = await axios.post(
      process.env.PYTHON_SERVICE_URL + '/suggest',
      { message: ticket.body },
      { headers: { 'Content-Type': 'application/json' } }
    );
    res.json({ suggestion: response.data.suggestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get suggestion' });
  }
});

app.listen(PORT, () => {
  console.log(`API gateway listening on port ${PORT}`);
});

module.exports = app;