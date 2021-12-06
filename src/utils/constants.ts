interface httpStatusModel {
  OK: number;
  CREATED: number;
  NO_CONTENT: number;
  BAD_REQUEST: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
}

export const HTTP_STATUS: httpStatusModel = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
