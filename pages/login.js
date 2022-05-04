import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input: AuthInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [message, setMessage] = useState("");
  const [ 
    auththenticateUser
   ] = useMutation(AUTHENTICATE_USER);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("email is not valid").required("email is required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      try {
        const { data } = await auththenticateUser({ 
          variables: {
            input: {
              email,
              password,
            }
          } 
        });

        setMessage("Authenticating...");
        

        const { token } = data.authenticateUser;
        localStorage.setItem('token', token);

        setTimeout(() => { //TODO: change this approach
          setMessage("");
          router.push("/")
        }, 2000);

      } catch (err) {
        setMessage(err.message);
        console.error(err.message);
        setTimeout(() => { //TODO: change this approach
          setMessage("");
        }, 3000);
      }
    }
  })
  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label 
                  className="block text-gray-700 text-sm font-bold mb-2" 
                  htmlFor="email"
                >
                  Email
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email"
                  type="email"
                  placeholder="User email"  
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {(formik.touched.email && formik.errors.email) ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div> 
                ): 
                  null
                }
              </div>

              <div className="mb-4">
                <label 
                  className="block text-gray-700 text-sm font-bold mb-2" 
                  htmlFor="password"
                >
                  Password
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password"
                  type="password"
                  placeholder="User password" 
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} 
                />
                {(formik.touched.password && formik.errors.password) ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div> 
                ): 
                  null
                }
              </div>

              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white hover:bg-gray-900 uppercase"
                value="login"
              />
              {message && (
                <div className="bg-white py-2 px-3 w-full my-3">
                  <p>{message}</p>
                </div>
              )}

            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
