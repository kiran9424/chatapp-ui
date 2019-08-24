import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import io from 'socket.io-client';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = [];
  user: any;
  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.user = this.tokenService.getDecodedToken().data;
    this.AllPosts();
    this.socket.on('refreshPage', (data) => {
      this.AllPosts();
    })
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data.message;
      },
      (err) => {
        
      });


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
