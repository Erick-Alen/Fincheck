import { sleep } from '../../utils/sleep';
import { httpClient } from '../httpClient';

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
}
type SignUpResponse = {
  accessToken: string;
}

export const signup = async (params: SignUpRequest) => {
  await sleep()
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', params)
  return data;
}
