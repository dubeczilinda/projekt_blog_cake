import { Injectable } from '@angular/core';

export interface Blogpost {
  id: String;
  type: String;
  title: String;
  content: String;
  picture: String;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export abstract class CreatePostService {

  constructor() { }


}
