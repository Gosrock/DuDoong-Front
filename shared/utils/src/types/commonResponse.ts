export type TResponseType<T> = {
  statusCode: number;
  success: boolean;
  data: T;
};
