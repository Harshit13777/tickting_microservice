import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default () => {
  const { doRequest, Errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    onSuccess: () => Router.push("/"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { Email, Password } = data;
    console.log(data);
    doRequest({ email: Email, password: Password });
  };

  return (
    <div className="w-full flex items-center justify-center h-screen bg-slate-200">
      <h1 className="absolute top-5  text-center pt-10 pb-5 block font-bold text-xl ">
        Sign In
      </h1>
      <form
        className="md:flex bg-white w-full md:w-fit shadow-2xl hover:shadow-lg shadow-slate-800  rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-col">
          <div className="md:flex">
            <div className={`mb-4 p-5`}>
              <label
                className={`block text-gray-700 text-sm font-bold mb-2`}
                htmlFor="Email"
              >
                Email
              </label>
              <input
                {...register("Email", {
                  required: { value: true, message: "Email is required" },
                })}
                className={`shadow  ${
                  errors.Email && " border-red-200 border-2"
                } appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="Email"
                type="email"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs italic">
                  {errors.Email.message}
                </p>
              )}
            </div>
            <div className="mb-5 p-5">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("Password", {
                  required: { value: true, message: "Password is required" },

                  maxLength: { value: 20, message: "Max 20 Char" },
                  minLength: { value: 4, message: "Min 4 Char" },
                })}
                className={`shadow ${
                  errors.Password && " border-red-200 border-2"
                } appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">
                  {errors.Password.message}
                </p>
              )}
            </div>
          </div>
          {Errors}
        </div>
        <div className=" flex-col-reverse space-y-7">
          <div className=" space-y-3">
            <button
              className="bg-blue-500 block m-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => Router.replace("./signup")}
            >
              Sign Up
            </button>
            <button className="bg-blue-500 m-auto block hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Forget Password
            </button>
          </div>
          <input
            className="bg-blue-500 shadow-lg hover:shadow-sm shadow-blue-900 block m-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"Sign In"}
          />
        </div>
      </form>
    </div>
  );
};
