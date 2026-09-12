
import { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import BottomSheet from "./BottomSheet";
import SortOptions from "./SortOptions";
import sortIcon from "../styles/icons/arrow-down-up.svg"
import "../styles/CollectionSearchSort.css"

export default function CollectionSearchSort({ search, sort, onSearchChange, onSortChange }) {
  const [showSortSheet, setShowSortSheet] = useState(false);

  function handleSelectSort(value) {
    onSortChange(value);
    setShowSortSheet(false);
  }

  return (
      <div className="collection-search-sort d-flex align-items-center gap-2 mb-3">
      <button className="sort-trigger" type="button" onClick={() => setShowSortSheet(true)}>
        <img src={sortIcon} alt="Sort" />
      </button>

      <Form.Control
        type="text"
        className="search-input"
        placeholder="Search your collections..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <BottomSheet isOpen={showSortSheet} onClose={() => setShowSortSheet(false)} title="Sort by">
        <SortOptions currentSort={sort} onSelect={handleSelectSort} />
      </BottomSheet>
    </div>
  );
}