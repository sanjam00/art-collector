
export default function CollectionSearchSort({ search, sort, onSearchChange, onSortChange }) {

  // add bootstrap classes
  return (
    <div className="collection-search-sort">
      {/* collections fire on every keystroke, could add lag ~300ms */}
      <input
        type="text"
        placeholder="Search your collections..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title (A–Z)</option>
      </select>
    </div>
  );
}