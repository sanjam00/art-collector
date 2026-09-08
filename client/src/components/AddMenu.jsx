import { useState } from "react"
import ListGroup from "react-bootstrap/ListGroup";

import BottomSheet from "./BottomSheet";
import CreateArtworkReviewModal from "./CreateArtworkReviewModal";
import CreateArtistReviewModal from "./CreateArtistReviewModal";
import CreateCollectionModal from "./CreateCollectionModal";

import plusCircleIcon from "../styles/icons/plus-circle.svg"
import plusCircleFillIcon from "../styles/icons/plus-circle-fill.svg"

export default function AddMenu(){
  const [activeView, setActiveView] = useState();

  function closeAll() {
    setActiveView(null);
  }

  return (
    <div className="add-menu">
      <button className="add-button icon-hover" type="button" onClick={() => setActiveView("choice")}>
        <img className="bi bi-plus-circle icon-default" src={plusCircleIcon} />
        <img className="bi bi-plus-circle icon-hover-state" src={plusCircleFillIcon} />
      </button>

      <BottomSheet
        isOpen={activeView === "choice"}
        onClose={closeAll}
        title="What would you like to create?"
      >
        <ListGroup variant="flush">
          <ListGroup.Item action onClick={() => setActiveView("artwork")}>
            Artwork Review
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setActiveView("artist")}>
            Artist Review
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => setActiveView("collection")}>
            Collection
          </ListGroup.Item>
        </ListGroup>

      </BottomSheet>

      {activeView === "artwork" && (
        <CreateArtworkReviewModal onClose={closeAll} onCreated={closeAll} />
      )}

      {activeView === "artist" && (
        <CreateArtistReviewModal onClose={closeAll} onCreated={closeAll} />
      )}

      {activeView === "collection" && (
        <CreateCollectionModal onClose={closeAll} onCreated={closeAll} />
      )}

    </div>
  )
}