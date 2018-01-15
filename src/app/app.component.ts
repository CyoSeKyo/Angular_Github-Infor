import { Component } from '@angular/core';
import { GitIdInfo, GitRepo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Subscription } from 'rxjs/Subscription';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GitIdInfo[] = [];
  repos: GitRepo[] = [];
  private getGitsub: Subscription;
  private gitRepo: Subscription;
  errorMessage = null;

  constructor(private ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
    this.gitRepo = this.ids.GetGitRepo(toadd).subscribe( info => {
      this.repos.push(info as GitRepo);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
  }
}
