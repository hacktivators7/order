import React, { useState } from 'react';
import PriorityQueue from 'js-priority-queue';

const QueueExample = () => {
  // Initialize the priority queue with a comparator function
  const pq = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });

  // State to hold the queue items
  const [queueItems, setQueueItems] = useState([]);
  const [item, setItem] = useState('');
  const [priority, setPriority] = useState(0);

  // Handle adding item to the queue
  const handleEnqueue = () => {
    if (item.trim() && !isNaN(priority)) {
      // Enqueue the item with a priority value
      pq.queue({ value: item, priority: parseInt(priority, 10) });

      // Update the queue state
      updateQueueState();
      setItem('');
      setPriority(0);
    }
  };

  // Update the state based on current queue
  const updateQueueState = () => {
    console.log(pq)
    pq && setQueueItems([...pq?.toArray()]);
  };

  // Handle dequeue (removing the highest priority item)
  const handleDequeue = () => {
    if (pq.length > 0) {
      pq.dequeue();
      updateQueueState();
    }
  };

  return (
    <div>
      <h2>Priority Queue in React</h2>

      {/* Input for item and priority */}
      <div>
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <button onClick={handleEnqueue}>Enqueue</button>
      </div>

      {/* Queue Display */}
      <div>
        <h3>Current Queue:</h3>
        <ul>
          {queueItems.map((queueItem, index) => (
            <li key={index}>
              {queueItem.value} (Priority: {queueItem.priority})
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons for Dequeue */}
      <div>
        <button onClick={handleDequeue} disabled={pq.length === 0}>
          Dequeue
        </button>
      </div>
    </div>
  );
};

export default QueueExample;