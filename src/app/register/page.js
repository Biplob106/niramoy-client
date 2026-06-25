"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { axiosPublic } from "@/lib/axios";
import useTitle from "@/hooks/useTitle";

export default function RegisterPage() {
  useTitle("রেজিস্টার");
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
  try {
    await createUser(data.email, data.password);
    await updateUserProfile(data.name, data.photo);
    await axiosPublic.post("/users", {        // ← database-এ save
      name: data.name,
      email: data.email,
      photo: data.photo,
      role: data.role || "patient",          // ← patient / doctor
    });
    toast.success("Registration successful!");
    router.push("/");
  } catch (error) {
    toast.error(error.message);
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
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Register to Niramoy</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="label">Name</label>
              <input type="text" className="input input-bordered w-full"
                {...register("name", { required: "Name is required" })} />
              {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })} />
              {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Photo URL</label>
              <input type="text" className="input input-bordered w-full"
                {...register("photo", { required: "Photo URL is required" })} />
              {errors.photo && <p className="text-error text-sm">{errors.photo.message}</p>}
            </div>
            <div>
              <label className="label">Register As</label>
              <select className="select select-bordered w-full"
                {...register("role")} defaultValue="patient">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              <p className="text-xs opacity-60 mt-1">
                ডাক্তার হিসেবে রেজিস্টার করলে অ্যাডমিন ভেরিফাই করার পর প্রোফাইল দেখা যাবে।
              </p>
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message: "Need 1 number and 1 special character",
                  },
                })} />
              {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary w-full">Register</button>
          </form>

          <div className="divider">OR</div>
          <button onClick={handleGoogle} className="btn btn-outline w-full">
            Continue with Google
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}