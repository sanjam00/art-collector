// list the sort options, displayed in bottomsheet.jsx then collectionsearchsort.jsx

import ListGroup from "react-bootstrap/ListGroup";

export default function SortOptions({ currentSort, onSelect }) {
  const options = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'title', label: 'Title (A–Z)' },
  ];

  return (
    <ListGroup variant="flush">
      {options.map((opt) => (
        <ListGroup.Item
          key={opt.value}
          action
          active={opt.value === currentSort}
          onClick={() => onSelect(opt.value)}
        >
          {opt.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}