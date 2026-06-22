"use client";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

// প্রতি request-এ কার্ড (token) অটো জুড়ে দেয়
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default function useAxiosSecure() {
  return axiosSecure;
}