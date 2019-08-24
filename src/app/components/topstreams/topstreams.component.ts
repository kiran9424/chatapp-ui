import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-topstreams',
  templateUrl: './topstreams.component.html',
  styleUrls: ['./topstreams.component.scss']
})
export class TopstreamsComponent implements OnInit {


  topPosts = [];
  user:any;
  socket:any;
  constructor(private postService: PostService, private tokenService:TokenService,private router:Router) {
    this.socket = io('http://localhost:8080')
   }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    this.getTopPosts();
    this.socket.on('refreshPage',()=>{
      this.getTopPosts();
    })
  }

  getTopPosts() {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.topPosts = data.topPosts;
      }, () => {

      })

  }

  likePost(post) {
    this.postService.postLike(post).subscribe((data) => {
      this.socket.emit('refresh', {});
      console.log(data);

    }, (err) => {
      console.log(err);

    });
  }

  likedPostColor(arr, userName) {
    return _.some(arr, { username: userName });
  }

  addComment(post) {
    this.router.navigate(['post', post._id]);
  }

}
