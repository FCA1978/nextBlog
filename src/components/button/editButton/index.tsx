import Link from "next/link";

interface button {
  noteId: any;
  children: any;
}

export default function EditButton({ noteId, children }: button) {
  const isDraft = noteId == null;
  return (
    <Link href={`/note/edit/${noteId || ""}`} className="link--unstyled">
      <button
        className={[
          "edit-button",
          isDraft ? "edit-button--solid" : "edit-button--outline",
        ].join(" ")}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  );
}
