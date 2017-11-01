import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log(this.getData())
  }

  getData() {
    this.http.get('http://localhost/api/test')
        		.subscribe(res => this.data = res);
  }

}
