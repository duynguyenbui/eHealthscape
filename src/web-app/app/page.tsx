import { currentUser } from "@/actions/token";
import { CarouselSliding } from "@/components/carousel-sliding";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="mt-4 ml-4">
      {user && (
        <div>
          <h1 className="text-2xl font-bold text-blue-500">
            Hello {user?.name}, welcome to Intership Summer 2024 by VASD 🫠 🫠
          </h1>
          <span className="text-muted-foreground">{user.email}</span>
          <br />
          <span className="text-muted-foreground">{user.sub}</span>
        </div>
      )}
      <div className="flex items-center h-full w-full mt-20 p-6">
        <CarouselSliding />
      </div>
    </div>
  );
}
