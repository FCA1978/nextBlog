import SidebarNoteListFilter from "@/components/side/sidebarNoteListFilter";
import { getAllNotes } from "@/lib/redis";

export default async function NoteList() {
  const notes = await getAllNotes();

  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return <SidebarNoteListFilter notes={notes} />;
}
