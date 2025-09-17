import { useEffect, useState } from 'react';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTickets = async (status = '') => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_API_PORT || 4000}/tickets${status ? '?status=' + status : ''}`);
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(filter);
  }, [filter]);

  return (
    <div className="container">
      <h1>AI Support Dashboard</h1>
      <div style={{ margin: '1rem 0' }}>
        <label>Filter by status: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      {loading ? <p>Loading tickets...</p> : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <h3>{ticket.subject}</h3>
            <p>{ticket.body}</p>
            <p className="status">Status: {ticket.status}</p>
          </div>
        ))
      )}
    </div>
  );
}