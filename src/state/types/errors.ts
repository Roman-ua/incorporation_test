export type ErrorResponse = {
  response: {
    data: {
      titles: string[];
      errors: string[];
    };
  };
};
