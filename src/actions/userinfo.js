import axios from "axios";
import moment from "moment";
const baseUrl = "https://api.youthol.cn/api/oa";

export const updateBaseInfo = data => ({
  type: "UPDATE_BASEINFO",
  data
});

// export const updateAuthInfo = data => ({
//   type: "UPDATE_AUTHINFO",
//   data
// });

export const updateAuthInfo = () => {
  const { token, expires_at } = sessionStorage;
  // return {
  //   type: "UPDATE_AUTHINFO",
  //   data: [1, 2, 3, 4]
  // };
  if (token || moment().isBefore(expires_at)) {
    axios
      .get(`${baseUrl}/user/permissions`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log(res);
        return {
          type: "UPDATE_AUTHINFO",
          data: [1, 2, 3, 4]
        };
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    console.log('时间不对')
  }
};

export const deleteUserinfo = () => ({
  type: "DELETE_USERINFO"
});
