import axios from "axios";
import qs from "qs";
import { ListPage, pageParam, Survey } from "./types";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
  },
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

export async function searchUser(
  params: object,
  pagin: pageParam
): Promise<ListPage<object>> {
  return instance({
    url: `users/search?page=${pagin.page}&pageSize=${pagin.pageSize}`,
    method: "POST",
    data: JSON.stringify(params),
  }).then((res) => res.data) as unknown as Promise<ListPage<object>>;
}

export async function saveUser(user: any) {
  if (user._id) {
    return instance({
      url: `users/${user._id}`,
      method: "put",
      data: JSON.stringify(user),
    });
  } else {
    return instance({
      url: "users",
      method: "POST",
      data: JSON.stringify(user),
    });
  }
}

export async function getSurvey(): Promise<ListPage<Survey>> {
  return instance({
    url: "surveys/search",
    method: "POST",
    data: JSON.stringify({ eqs: { category: "CAPABILITY_ASSESSMENT" } }),
  }).then((res) => res.data) as unknown as Promise<ListPage<Survey>>;
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
