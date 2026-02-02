const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://job-portal-backend-r4vc.onrender.com/api/v1";

export const USER_API_END_POINT = `${BACKEND_URL}/user`;
export const JOB_API_END_POINT = `${BACKEND_URL}/job`;
export const APPLICATION_API_END_POINT = `${BACKEND_URL}/application`;
export const COMPANY_API_END_POINT = `${BACKEND_URL}/company`;