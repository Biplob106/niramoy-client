"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { axiosPublic } from "@/lib/axios";
import useTitle from "@/hooks/useTitle";

export default function LoginPage() {
  useTitle("লগইন");
  const { signIn, googleSignIn } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      const loggedUser = result.user;
      await axiosPublic.post("/users", {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photo: loggedUser.photoURL,
      });
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-mesh px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-200">
        <div className="card-body">
          <Link href="/" className="flex items-center justify-center gap-2 mb-1">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-bold shadow-md">
              নি
            </span>
            <span className="text-2xl font-extrabold text-gradient">নিরাময়</span>
          </Link>
          <h2 className="text-2xl font-bold text-center">আবার স্বাগতম</h2>
          <p className="text-center text-sm opacity-60 mb-2">আপনার অ্যাকাউন্টে লগইন করুন</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="label">Email</label>
              <input type="email" className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input input-bordered w-full"
                {...register("password", { required: "Password is required" })} />
              {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </form>

          <div className="divider">OR</div>
          <button onClick={handleGoogle} className="btn btn-outline w-full">
            Continue with Google
          </button>

          <p className="text-center text-sm">
            New here?{" "}
            <Link href="/register" className="link link-primary">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}