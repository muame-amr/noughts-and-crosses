import { useState } from 'react';

// Custom hook for managing a queue
function useQueue<T>() {
    const [items, setItems] = useState<T[]>([]);

    // Enqueue an item into the queue
    const enqueue = (item: T) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    // Dequeue an item from the queue
    const dequeue = (): T | null => {
        if (items.length === 0) {
            return null;
        }
        const [removedItem, ...rest] = items;
        setItems(rest);
        return removedItem;
    };

    // Get the front item of the queue without dequeuing
    const peek = (): T | null => {
        return items.length > 0 ? items[0] : null;
    };

    // Check if the queue is empty
    const isEmpty = (): boolean => {
        return items.length === 0;
    };

    return { enqueue, dequeue, peek, isEmpty };
}

export default useQueue;
