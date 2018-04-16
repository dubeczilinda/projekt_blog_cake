import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, Response, RequestOptions } from '@angular/http';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';
import { Blogpost, CreatePostService } from './create-post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  adat: Blogpost;
  datas: any;

  constructor(public http: Http) {
    this.getAll();
  }

  errorHandling (res) {
    res = JSON.parse(res['_body']);
        if (res.error) {
          console.error('API error: ' + res.error);
        } else {
          this.datas = res;
        }
  }

  getAll() {
    this.http.get('http://localhost:3000/blog').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  create() {
    this.http.post('http://localhost:3000/blog', this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  update() {
    this.http.put(`http://localhost:3000/blog/${this.adat['id']}`, this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

}
