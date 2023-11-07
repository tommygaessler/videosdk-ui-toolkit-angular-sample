import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import uitoolkit from "@zoom/videosdk-ui-toolkit";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  UIToolKitConfig: any = {
    features: ['video', 'audio', 'share', 'chat', 'settings', 'users']
  }

  constructor(public httpClient: HttpClient) {

  }

  ngOnInit() {
    this.getVideoSDKJWT()
  }

  getVideoSDKJWT() {
    this.UIToolKitConfig.userName = 'test'
    this.UIToolKitConfig.sessionName = 'hello'
    this.UIToolKitConfig.sessionPasscode = 'test'

    this.httpClient.post('https://or116ttpz8.execute-api.us-west-1.amazonaws.com/default/videosdk', JSON.stringify({
	    sessionName: this.UIToolKitConfig.sessionName,
	    role: 1
    })).toPromise().then((data: any) => {
      if(data.signature) {
        console.log(data.signature)
        this.UIToolKitConfig.videoSDKJWT = data.signature
        this.joinSession()
      } else {
        console.log(data)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  joinSession() {

    var sessionContainer = document.getElementById('sessionContainer') as HTMLElement

    uitoolkit.joinSession(sessionContainer, this.UIToolKitConfig)

    uitoolkit.onSessionJoined((data: any) => {
      console.log(data)
      console.log('session joined')
    })

    uitoolkit.onSessionClosed((data: any) => {
      console.log(data)
      console.log('session closed')
    })
  }
}