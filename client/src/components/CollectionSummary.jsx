// collection summary used to display summary of collections for feeds (list of collections)

import { useState } from "react";

export default function CollectionSummary(){
  const [collections, setCollections] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  // idk if i need this component
}