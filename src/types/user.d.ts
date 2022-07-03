enum PersonType {
  NATURAL = 'NATURAL',
  JURIDIC = 'JURIDIC',
}

export interface User {
  email: string;
  username: string;
  document_id: string;
  type: PersonType;
  first_name: string;
  last_name: string;
}
