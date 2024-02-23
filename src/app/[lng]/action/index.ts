"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

export async function saveNote(formData: any) {
  // 获取nodeId
  const noteId = formData.get("noteId");
  const data = JSON.stringify({
    title: formData.get("title"),
    content: formData.get("body"),
    updateTime: new Date(),
  });

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  // 更新数据库 
  if (noteId) {
    updateNote(noteId, data);
    revalidatePath("/", "layout");
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    revalidatePath("/", "layout");
    redirect(`/note/${res}`);
  }

  return { message: `Add Success!` };
}

export async function deleteNote(formData: any) {
  const noteId = formData.get("noteId");
  delNote(noteId);
  revalidatePath("/", "layout");
  redirect("/");
}
