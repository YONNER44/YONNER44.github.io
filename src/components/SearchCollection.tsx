import type { CollectionEntry } from "astro:content"
import React, { useEffect, useState } from "react";
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"
import SearchBar from "@components/SearchBar"

type Props = {
  entry_name: string
  tags: string[]
  data: CollectionEntry<"blog">[] | CollectionEntry<'projects'>[]
}

export default function SearchCollection({ entry_name, data, tags }: Props) {
  const coerced = data.map((entry) => entry as CollectionEntry<'blog'>);

 const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Set<string>>(new Set());
  const [collection, setCollection] = useState<CollectionEntry<'blog'>[]>(coerced);
  const [descending, setDescending] = useState(false);

  const fuse = new Fuse(coerced, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  useEffect(() => {
    const filtered = (query.length < 2
      ? coerced
      : fuse.search(query).map((result) => result.item)
    ).filter((entry) =>
      Array.from(filter).every((value) =>
        entry.data.tags.some((tag: string) =>
          tag.toLowerCase() === String(value).toLowerCase()
        )
      )
    );
    setCollection(descending ? [...filtered].reverse() : filtered);
  }, [query, filter, descending, data]);

  function toggleDescending() {
    setDescending((prev) => !prev);
  }

  function toggleTag(tag: string) {
    setFilter((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  }

  function clearFilters() {
    setFilter(new Set());
  }

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    const wrapper = document.getElementById("search-collection-wrapper");
    if (wrapper) {
      wrapper.style.minHeight = "unset";
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Control Panel */}
      <div className="col-span-3 sm:col-span-1">
        <div className="sticky top-24 mt-7">
          {/* Search Bar */}
          <SearchBar onSearchInput={onSearchInput} query={() => query} setQuery={setQuery} placeholderText={`Buscar ${entry_name}`} />
          {/* Tag Filters */}
          <div className="relative flex flex-row justify-between w-full">
            <p className="text-sm font-semibold uppercase my-4 text-black dark:text-white">Etiquetas</p>
            {filter.size > 0 && (
              <button
                onClick={clearFilters}
                className="absolute flex justify-center items-center h-full w-10 right-0 top-0 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300"
              >
                <svg className="size-5">
                  <use href={`/ui.svg#x`} />
                </svg>
              </button>
            )}
          </div>
          <ul className="flex flex-wrap sm:flex-col gap-1.5">
            {tags.map((tag) => (
              <li className="sm:w-full" key={tag}>
                <button
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "w-full px-2 py-1 rounded",
                    "flex gap-2 items-center",
                    "bg-black/5 dark:bg-white/10",
                    "hover:bg-black/10 hover:dark:bg-white/15",
                    "transition-colors duration-300 ease-in-out",
                    filter.has(tag) && "text-black dark:text-white"
                  )}
                >
                  <svg
                    className={cn(
                      "shrink-0 size-5 fill-black/50 dark:fill-white/50",
                      "transition-colors duration-300 ease-in-out",
                      filter.has(tag) && "fill-black dark:fill-white"
                    )}
                  >
                    <use
                      href={`/ui.svg#square`}
                      className={(!filter.has(tag) ? "block" : "hidden")}
                    />
                    <use
                      href={`/ui.svg#square-check`}
                      className={(filter.has(tag) ? "block" : "hidden")}
                    />
                  </svg>
                  <span className="truncate block min-w-0 pt-[2px]">
                    {tag}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Posts */}
      <div className="col-span-3 sm:col-span-2">
        <div className="flex flex-col">
          {/* Info Bar */}
          <div className='flex justify-between flex-row mb-2'>
            <div className="text-sm uppercase">
              MOSTRANDO {collection.length} DE {data.length} {entry_name}
            </div>
            <button onClick={toggleDescending} className='flex flex-row gap-1 stroke-neutral-400 dark:stroke-neutral-500 hover:stroke-neutral-600 hover:dark:stroke-neutral-300 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 hover:dark:text-neutral-300'>
              <div className="text-sm uppercase">
                {descending ? "DESCENDENTE" : "ASCENDENTE"}
              </div>
              <svg
                className="size-5 left-2 top-[0.45rem]"
              >
                <use href={`/ui.svg#sort-descending`} className={descending ? "block" : "hidden"}></use>
                <use href={`/ui.svg#sort-ascending`} className={descending ? "hidden" : "block"}></use>
              </svg>
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {collection.map((entry) => (
              <li key={entry.slug}>
                <ArrowCard entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
