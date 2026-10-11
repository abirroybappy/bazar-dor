import { requireSession } from "@/lib/session";
import Profile from "@/components/profile";
export default async function Page() {
  const session = await requireSession();
  return (
    <Profile
      user={{ name: session.user.name, email: session.user.email }}
      edit={true}
    />
  );
}
