import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/SignInCard";

const SignInPage = async () => {
    const user = await getCurrent();

    if (user) redirect("/");

    return <SignInCard />;
};

export default SignInPage;