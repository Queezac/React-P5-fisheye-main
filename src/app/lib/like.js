'use server';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

import { revalidatePath } from "next/cache";

export async function toggleLikeMedia(mediaId, isLiked) {
  try {
    const diff = isLiked ? 1 : -1;

    await prisma.media.update({
      where: { id: mediaId },
      data: {
        likes: { increment: diff }
      }
    });

    revalidatePath("/photographes/[id]", "page");
    
    return { success: true };
  } catch (error) {
    console.error("Erreur lors du like:", error);
    return { success: false, error: "Impossible de mettre à jour les likes." };
  }
}