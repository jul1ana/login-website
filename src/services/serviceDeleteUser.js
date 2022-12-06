import api from "../config/configApi";

export const serviceDeleteUser = async (idUser) => {
  var status = false;

  const headers = {
    "headers": {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  await api.delete("/user/" + idUser, headers)
    .then((response) => {
      status = {
        type: "success",
        message: response.data.message
      };
    }).catch((err) => {
      if (err.response) {
        status = {
          type: "error",
          message: err.response.data.message
        };
      } else {
        status = {
          type: "error",
          message: "ERROR: Try later!"
        };
      }
    });

  return status;
}