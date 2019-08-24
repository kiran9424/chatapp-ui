import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { PeopleComponent } from 'src/app/components/people/people.component';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';

const route: Routes = [
  { path: 'streams', component: StreamsComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: CommentsComponent, canActivate: [AuthGuard] },
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
  { path: 'people/following', component: FollowingComponent, canActivate: [AuthGuard] },
  { path: 'people/follower', component: FollowersComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports: [RouterModule]
})
export class StreamsRoutingModule { }
