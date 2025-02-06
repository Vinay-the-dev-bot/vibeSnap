import React, { useState } from "react";
import group from "../../assets/Group.png";
import vibesnap from "../../assets/vibesnap.png";
import google from "../../assets/google.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { base_URL } from "../../Constants/Constants";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post(`${base_URL}/users/login`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const { token, status, msg } = response.data;
        if (status) {
          dispatch({
            type: "PROFILE",
            payload: { token, ...response.data?.userData, isLoggedIn: true }
          });
          localStorage.setItem("vibeSnapToken", token);
          toast({
            description: msg || "Logged in.",
            status: "success",
            duration: 1000
          });
          navigate("/");
        } else {
          localStorage.setItem("vibeSnapToken", "");
          toast({
            description: msg || "Something went wrong.",
            status: "error",
            duration: 1000
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await axios.post(
          `${base_URL}/users/register`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (response.data.status) setIsLogin(!isLogin);
        else {
          toast({
            description: response.data.msg || "Something went wrong.",
            status: "error",
            duration: 1000
          });
        }
      } catch (error) {
        if (error.response?.status === 409) {
          toast({
            description: "User already exists. Please use a different email.",
            status: "error",
            duration: 1000
          });
        } else {
          console.error("Error:", error);
          toast({
            description:
              error.response?.data?.msg ||
              "Server error. Please try again later.",
            status: "error",
            duration: 1000
          });
        }
      }
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "60px"
      }}
    >
      <div style={{ width: "fit-content" }}>
        <img
          style={{ borderRadius: "26px", height: "70vh" }}
          src={group}
          alt="loginIcon"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          alignItems: "center",
          justifyContent: "space-evenly"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <div style={{ display: "flex" }}>
            <img style={{ height: "100%" }} src={vibesnap} alt="img" />
            <p
              style={{
                fontWeight: "600",
                fontSize: "28px",
                lineHeight: "33px"
              }}
            >
              VibeSnap
            </p>
          </div>
          <p
            style={{
              marginTop: "15px",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "20px"
            }}
          >
            Moments That Matter, Shared Forever.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", textAlign: "center" }}
        >
          {!isLogin && (
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd"
                }}
              />
            </div>
          )}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd"
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#292929",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <button
          // onClick={() => {
          //   navigate("/");
          //   localStorage.setItem("isVibeSnapLoggedIn", true);
          //   dispatch({
          //     type: "PROFILE",
          //     payload: {
          //       name: "Sakshi Agarwal",
          //       profileImage:
          //         "https://s3-alpha-sig.figma.com/img/b54f/d858/f5e14f76f0793df709ce9bfe5e5f284e?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L-9ysSt-bAnJqt0Zc7FwQq-JgO0IZPY11U7I3jeVZIxUbEdTa6pOfvU~ftKvuHvSRVF23U2hFql1erDP6mOZfANUpWoHH4~P674MUjJdb9KUserOaJ7Nx8IEiu93PrzpEmGUyu5-ZmlYsSniJY0dfmcxh6nwuuAu7azqxvqbgZtWCPBzTO2RKtIgLAfu9NP7wUe-JnrFuC9SXA2sW8HtSw~hIx5HgaPp6ZsUqs4L3j9pPTyRGh4ljHHRyeZ86fGj7ohZ-ToF8B-tHXit0rZyCwgOEVWD5YCmUEuhEyKXTunvZPxxnMtuhPcHrLPe7yCmNKcpO1ZarqSZoeSqM0aDfA__"
          //     }
          //   });
          // }}
          onClick={handleSubmit}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            borderRadius: "26px",
            background: "#292929",
            padding: "14px 19px",
            gap: "14px",
            border: "none"
          }}
        >
          <img src={google} alt="google" />
          <p
            style={{
              fontWeight: "700",
              fontSize: "16px",
              lineHeight: "23px",
              color: "#FFFFFF"
            }}
          >
            Continue with Google
          </p>
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          style={{
            cursor: "pointer",
            color: "#007BFF",
            textDecoration: "underline"
          }}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
