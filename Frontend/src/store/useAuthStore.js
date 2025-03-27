import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogginigIn: false,
    isUpdatingProfile: false,

    //this will check that if user is authenticated or not, until it check we will see a loader on the screen
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.log("error is checkAuth", error);
            set({authUser:null});
        } finally {
            set({ isCheckingAuth: false});
        }
    },


    signup: async (data) => {
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account Created Successfully🥳");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false});
        }
    },


    login: async (data) => {
        set({ isLogginigIn: true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged In Successfully😍");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLogginigIn: false});
        }
    },


    logout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");
            set({ authUser: res.data});
            toast.success("Logged Out Successfully😒");
        } catch (error) {
            toast.error(error.response.data.message);
        } 
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data});
            toast.success("Profile Updated SUccessfully😍 ");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false})
        }
    }


}));