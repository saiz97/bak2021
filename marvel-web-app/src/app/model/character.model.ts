// reference: https://developer.marvel.com/documentation/entity_types
export class Character {
  id: number;           // The unique ID of the character resource.
  name:	string;         // The name of the character.
  description: string;  // A short bio or description of the character.
  resourceURI: string;  // The canonical URL identifier for this resource.
  thumbnail: string;    // The representative image for this character.

  constructor(name: string, resourceURI: string) {
    this.name = name;
    this.resourceURI = resourceURI;
  }

}
