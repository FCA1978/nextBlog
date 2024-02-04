"use client";

import SidebarNoteItem from "@/components/side/sideBarNoteItem";
import { useSearchParams } from "next/navigation";

export default function SidebarNoteListFilter({ notes }: any) {
  // 获取网页搜索参数
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="notes-list">
      {Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note as string);
        if (
          !searchText ||
          (searchText &&
            noteData.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <li key={noteId}>
              <SidebarNoteItem
                noteId={noteId}
                note={JSON.parse(note as string)}
              />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}
