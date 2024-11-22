import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/libs/prismadb"; // Adjust the path if necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { reservationId } = req.body; // You will send the reservation ID to update it
    const { status } = req.body;

    if (!reservationId || status !== "confirmed") {
      return res.status(400).json({ error: "Invalid status or missing reservationId" });
    }

    try {
      // Update the reservation status to 'confirmed'
      const updatedReservation = await prisma.reservation.update({
        where: { id: reservationId },
        data: { status },
      });

      return res.status(200).json(updatedReservation);
    } catch (error) {
      console.error("Error updating reservation status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
