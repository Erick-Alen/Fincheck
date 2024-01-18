import { sleep } from '../../utils/sleep';
import { httpClient } from '../httpClient';

export type SignInRequest = {
  email: string;
  password: string;
}
type SignInResponse = {
  accessToken: string;
}

export const signin = async (params: SignInRequest) => {
  await sleep()
  const { data } = await httpClient.post<SignInResponse>('/auth/signin', params)
  return data;
}
