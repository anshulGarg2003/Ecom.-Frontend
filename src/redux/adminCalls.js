import { publicRequest } from "../requestMethos";

export const announcecall = async (dispatch, user) => {
  try {
    const res = await publicRequest.post("/announcement/add", user);
    return res.data;
    // console.log(res.data)
  } catch (err) {
    console.log("announce", err);
  }
};
