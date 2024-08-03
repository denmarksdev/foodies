"use server";

import { saveMeal } from "@/meals";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidText(meal.title)) {
    return {
      message: "Invalid title",
    };
  }
  if (isInvalidText(meal.summary)) {
    return {
      message: "Invalid summary",
    };
  }
  if (isInvalidText(meal.instructions)) {
    return {
      message: "Invalid instructions",
    };
  }
  if (isInvalidText(meal.creator)) {
    return {
      message: "Invalid Creator",
    };
  }
  if (isInvalidText(meal.creator_email)) {
    return {
      message: "Invalid creator email",
    };
  }
  if (!meal.creator_email.includes("@")) {
    return {
      message: "Invalid email",
    };
  }

  await saveMeal(meal);

  revalidatePath("/meals");

  redirect("/meals");
}
