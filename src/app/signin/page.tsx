import AuthForm from "@/components/auth-form";
export const metadata = { title: "সাইন ইন" };
export default async function Signin({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; error?: string }>;
}) {
  const q = await searchParams;
  return (
    <AuthForm
      protectedRedirect={q.reason === "protected"}
      oauthError={!!q.error}
    />
  );
}
