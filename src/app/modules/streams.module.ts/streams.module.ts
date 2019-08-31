import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { TokenService } from 'src/app/services/token.service';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { SideComponent } from '../../components/side/side.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/services/token-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/app/components/people/people.component';
import { PeopleService } from 'src/app/services/people.service';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { TopstreamsComponent } from 'src/app/components/topstreams/topstreams.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { MessageService } from 'src/app/services/message.service';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import { EmojiPickerModule } from 'ng2-emoji-picker';

@NgModule({
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    PeopleComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    TopstreamsComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    EmojiPickerModule.forRoot() 

  ],
  exports: [
    StreamsComponent,
    ToolbarComponent,
    CommentsComponent
  ],
  providers: [
    TokenService,
    AuthGuard,
    PostService,
    PeopleService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class StreamsModule { }
