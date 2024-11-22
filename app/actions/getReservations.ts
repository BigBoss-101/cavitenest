import prisma from "@/app/libs/prismadb";
import { SafeReservation, SafeUser } from "../types";  // Import types

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams): Promise<SafeReservation[]> {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Safely map the reservations with default values for null fields
    const safeReservations: SafeReservation[] = reservations.map((reservation) => ({
      id: reservation.id,  // Add missing 'id' field
      userId: reservation.userId,  // Add missing 'userId' field
      listingId: reservation.listingId,  // Add missing 'listingId' field
      listingOwner: reservation.listingOwner,
      totalPrice: reservation.totalPrice,  // Add missing 'totalPrice' field
      status: reservation.status,  // Add missing 'status' field
      createdAt: reservation.createdAt ? reservation.createdAt.toISOString() : "Invalid Date",
      startDate: reservation.startDate ? reservation.startDate.toISOString() : "Invalid Date",
      endDate: reservation.endDate ? reservation.endDate.toISOString() : "Invalid Date",
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt ? reservation.listing.createdAt.toISOString() : "Invalid Date",
      },
      users: reservation.user
        ? [{
            ...reservation.user,
            createdAt: reservation.user.createdAt ? reservation.user.createdAt.toISOString() : "Invalid Date",
            updatedAt: reservation.user.updatedAt ? reservation.user.updatedAt.toISOString() : "Invalid Date",
            emailVerified: reservation.user.emailVerified ? reservation.user.emailVerified.toISOString() : null,
            favoriteIds: reservation.user.favoriteIds || [],
          }]
        : [], // In case user is null, provide an empty array
    }));

    return safeReservations;
  } catch (error: any) {
    console.error("Error fetching reservations:", error);
    throw new Error(error.message || "Error occurred while fetching reservations");
  }
}
