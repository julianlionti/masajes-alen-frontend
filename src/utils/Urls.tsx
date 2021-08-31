// import dotenv from "dotenv";
// dotenv.config();

const baseURL = process.env.BASE_URL;
const apiUrl = `${baseURL}api/`;

const Urls = {
  turn: `${apiUrl}turn`,
};

export default Urls;
