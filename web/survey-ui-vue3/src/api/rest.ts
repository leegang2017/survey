import axios from "axios";
import qs from "qs";
import { ListPage, Survey } from "./types";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});

export async function login({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  return instance({
    url: "auth/login",
    method: "POST",
    data: qs.stringify({ username: id, password }),
  }).then((res) => res.data);
}

export async function searchUser(params: object) {
  return instance({
    url: "users/search",
    method: "POST",
    data: JSON.stringify({ eqs: params }),
  });
}

export async function getSurvey(): Promise<ListPage<Survey>> {
  return (instance({
    url: "surveys/search",
    method: "POST",
    data: JSON.stringify({ eqs: { category: "CAPABILITY_ASSESSMENT" } }),
  }).then((res) => res.data) as unknown) as Promise<ListPage<Survey>>;
}

export async function updateSurvey(survey: any) {
  return instance({
    url: `surveys/${survey._id}`,
    method: "put",
    data: JSON.stringify(survey),
  });
}

export async function getSurveyRecord(targetId: string) {
  return instance({
    url: "surveyRecords/search",
    method: "POST",
    data: JSON.stringify({ eqs: { "target._id": targetId } }),
  });
}

export async function saveSurveyRecord(surveyRecord: object) {
  return instance({
    url: "surveyRecords",
    method: "POST",
    data: JSON.stringify(surveyRecord),
  });
}

// export async function verifyOTP(data) {
//   return axios({
//     method: "post",
//     url: "/api/verifyotp",
//     data: qs.stringify(data),
//   }).catch((err) => {
//     alert(err.response.data.message);
//   });
// }
