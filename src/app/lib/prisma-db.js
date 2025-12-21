const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getPhotographerWithLikes = async (id) => {
  const photographer = await prisma.photographer.findUnique({
    where: { id },
    include: { medias: true },
  });

  if (!photographer) return null;

  const totalLikes = photographer.medias.reduce((acc, media) => acc + media.likes, 0);

  return { ...photographer, totalLikes };
};

export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
