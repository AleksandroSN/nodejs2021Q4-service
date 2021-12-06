import { HTTP_STATUS } from "./constants";

/**
 * Search element in array
 * @param arr - array  
 * @param res - response
 * @param id - string
 * @returns number or response code
 */

export const findId = (arr, res, id) => {
  const findIdx = arr.findIndex((el) => el.id === id);
  if (findIdx < 0) {
    res.code(HTTP_STATUS.NOT_FOUND).send(`${id} not found`);
  }
  return findIdx;
};

