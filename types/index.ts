export type SignUpState = {
  success: boolean;
  error: string;
};

export const signUpInitialState: SignUpState = {
  success: false,
  error: "",
};
