import request from '../utils/request';


export function login({ phone, password }) {
  return request(`users/login?phone=${phone}&password=${password}`);
}

export function searchUser(params) {
  return request('users/search', {
    method: 'POST',
    body: JSON.stringify({ 'eqs': params }),
  });
}

export function getSurvey() {
  return request('surveys/search', {
    method: 'POST',
    body: JSON.stringify({ 'eqs': { category: 'CAPABILITY_ASSESSMENT' } }),
  });
}

export function updateSurvey(survey) {
  return request(`surveys/${survey._id}`, {
    method: 'put',
    body: JSON.stringify(survey),
  });
}

export function getSurveyRecord(targetId) {
  return request('surveyRecords/search', {
    method: 'POST',
    body: JSON.stringify({ 'eqs': { 'target._id': targetId } }),
  });
}

export function saveSurveyRecord(surveyRecord) {
  return request('surveyRecords', {
    method: 'POST',
    body: JSON.stringify(surveyRecord),
  });
}
