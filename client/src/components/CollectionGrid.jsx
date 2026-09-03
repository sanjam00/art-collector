
export default function CollectionGrid({
  collections, loading, page, totalPages, onPageChange, onCollectionClick
}) {
  if (loading) return <p>Loading collections...</p>;

  if (!loading && collections.length === 0) {
    return <p>No collections found. Create your first one!</p>;
  }

  // add bootstrap classes
  return (
    <div className="collection-grid-wrapper">
      <div className="collection-grid">
        {collections.map((c) => (
          <div
            key={c.id}
            className="collection-item"
            onClick={() => onCollectionClick(c)}
          >
            <div className="card">
              <img
                className="card-img-top"
                src={c.collection_img}
                alt={`${c.title} cover`}
              />
              <p className="card-body">{c.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}