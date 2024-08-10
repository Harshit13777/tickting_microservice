import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

export default () => {
  const { doRequest, Errors } = useRequest({
    url: "/api/users/signup",
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
      <form
        className="bg-white w-full md:w-fit shadow-2xl hover:shadow-lg shadow-slate-800  rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`mb-4`}>
          <label
            className={`block text-gray-700 text-sm font-bold mb-2`}
            for="Email"
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
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
        {Errors}
        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value={"Sign Up"}
          />
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};
