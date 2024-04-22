type ImportProductsResponse = {
  failedImport: unknown[];
  successImport: unknown[];
};


export type ChangePasswordRequest = {
  previousPassword: "string",
  proposedPassword:"string"

}