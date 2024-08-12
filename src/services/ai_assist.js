"use client";

import axios from "axios";


// const baseUrl = process.env.NODE_ENV === 'development'
//   ? `http://localhost:3003/api/products`
//   : "https://cuffy-backend.vercel.app/api/products";

const baseUrl = "https://eightsight-backend.vercel.app/";

export const getCorrectChart = async (message) => {
  const response = (await axios.get(`${baseUrl}/?message=${message}`));
  return response.data;
};
