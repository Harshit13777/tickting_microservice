import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default () => {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [errorss, set_errors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log("data=", data, "Errors=", errors);
  console.log(errors);

  const onsubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
    } catch (error) {
      console.log(error.response.data);
      set_errors(error.response.data.Error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email "
          {...register("Email ", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("Password", {
            required: true,
            max: 20,
            min: 3,
            maxLength: 16,
          })}
        />

        <input type="submit" />
      </form>
    </>
  );
};
