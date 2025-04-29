import React, { useState } from 'react';

export default function Homepage() {
  const [idea, setIdea] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse('Generating...');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: idea })
      });

      const data = await res.json();
      setResponse(data.result || 'No response received.');
    } catch (err) {
      setResponse('An error occurred while generating.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧠 FoundryBot: Business Builder</h1>
      <input
        type="text"
        value={idea}
        placeholder="Enter a business idea..."
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleGenerate} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <p style={{ marginTop: '1rem' }}>{response}</p>
    </div>
  );
}
