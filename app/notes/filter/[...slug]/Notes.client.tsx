"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDebouncedSearch = useDebouncedCallback((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data } = useQuery({
    queryKey: ["notes", { page }, { search }, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search,
        tag,
        perPage: 12,
      }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            handleDebouncedSearch(value);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPage={data.totalPages}
            page={page}
            onPageSelect={setPage}
          />
        )}

        <Link href="/notes/action/create">Create note +</Link>
      </div>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </>
  );
}
