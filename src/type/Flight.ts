export interface SearchParams {
  limit?: number;
  originSkyId: string;
  destinationSkyId: string;
  date: string;
  returnDate?: string;
  originEntityId?: string;
  destinationEntityId?: string;
}
