import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  commentForm: FormGroup;
  hideNavContent: any;
  postId: any;
  comments = [];
  socket: any;
  post: any;
  constructor(private fb: FormBuilder,
    private postService: PostService,
    private activeRoute: ActivatedRoute) {
    this.socket = io('http://localhost:8080');
  }

  ngOnInit() {
    this.postId = this.activeRoute.snapshot.paramMap.get('id');
    this.hideNavContent = document.querySelector('.nav-content');
    this.createForm();
    this.getSinglePost();

    this.socket.on('refreshPage', (data) => {
      this.getSinglePost();
    })
  }

  ngAfterViewInit() {
    this.hideNavContent.style.display = 'none';
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    })
  }

  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(
      (data) => {
        this.socket.emit('refresh', {})
        this.commentForm.reset();
      }, () => { })
  }

  getSinglePost() {
    this.postService.getSinglePost(this.postId).subscribe(
      (comment) => {
        this.post = comment.post.post;
        this.comments = comment.post.comments.reverse();
      },
      () => {

      })
  }
}
