import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/legacy/image";

import SidebarSearchField from "@/components/side/sidebarSearchField";
import SidebarNoteList from "@/components/side/sidebarNoteList";
import EditButton from "@/components/button/editButton";
import NoteListSkeleton from "@/components/side/noteListSkeleton";

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/next.svg"
              width="22"
              height="20"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={null}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
