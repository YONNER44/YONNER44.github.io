import type { CollectionEntry } from "astro:content";
import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import ArrowCard from "@components/ArrowCard";
import SearchBar from "@components/SearchBar";

type Props = {
  data: CollectionEntry<"blog">[];
};

export default function Search({ data }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CollectionEntry<"blog">[]>([]);

  const fuse = new Fuse(data, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  });

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
    } else {
      setResults(fuse.search(query).map((result) => result.item));
    }
  }, [query, data]);

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col">
      <SearchBar
        onSearchInput={onSearchInput}
        query={() => query}
        setQuery={setQuery}
        placeholderText="¿Qué estás buscando?"
      />

      {query.length >= 2 && results.length >= 1 && (
        <div className="mt-12">
          <div className="text-sm uppercase mb-2">
            Se encontraron {results.length} resultados para '{query}'
          </div>
          <ul className="flex flex-col gap-3">
            {results.map((result) => (
              <li key={result.slug}>
                <ArrowCard entry={result} pill={true} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}