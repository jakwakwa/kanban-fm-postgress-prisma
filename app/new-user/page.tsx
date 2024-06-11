import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    });

    if (!match) {
      const email = user.emailAddresses?.[0]?.emailAddress;
      const name = user.firstName;
      const image = user.imageUrl;

      if (email && name) {
        await prisma.user.create({
          data: {
            clerkId: user.id,
            email,
            name,
            image,
          },
        });
      }
    }
  }

  redirect("/kanban");
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUser;
