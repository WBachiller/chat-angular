import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConversationService } from './services/conversation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title     = 'chatbot';
  type      = 'input';
  nextParam = ''

  messages: any = [];
  form = new FormGroup({
    //resolution_number: new FormControl(0),
    message: new FormControl('')
  });

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
   
    const data = {
      position: "right",
      message: "init",
      next_param: ""
    };
    this.scroll()
    this.messages[this.messages.length] = data;
    this.conversationService.getMessage(data).subscribe((res: any) => {
      console.log(res.data.response);
      this.messages[this.messages.length] =  { 
        message: res.data.response.items.responses, 
        position: 'left', 
        options: res.data.response.items.options
      }
      this.type       = res.data.response.items.type
      this.nextParam  = res.data.response.items.next_patterns
      this.scroll()
    });

  }

  async  send(){
    const message = await this.form.get('message')?.value;
    const data = await {
      position: "right",
      next_param: this.nextParam,
      message
    };
    
    this.messages[this.messages.length] = await  data;
    await this.scroll()
    await  this.form.get('message')?.setValue('');
    await this.conversationService.getMessage(data).subscribe(async (res: any)=>{
      console.log(res.data.response);
        this.messages[this.messages.length] = await  {message: res.data.response.items.responses, position: 'left', options: res.data.response.items.options}
        this.type       = res.data.response.items.type
        this.nextParam  = res.data.response.items.next_patterns
    });
    setTimeout(()=> this.scroll(), 1000);
  }

  async  sendOption(option: string){
    const message = option;
    const data = await {
      position: "right",
      next_param: this.nextParam,
      message
    };
    
    console.log(data);
    this.messages[this.messages.length] = await  data;
    await this.scroll()
    await  this.form.get('message')?.setValue('');
    await this.conversationService.getMessage(data).subscribe(async (res: any)=>{
      console.log(res.data.response);
        this.messages[this.messages.length] = await  {message: res.data.response.items.responses, position: 'left', options: res.data.response.items.options}
        this.type = res.data.response.items.type
        this.nextParam  = res.data.response.items.next_patterns
    });
    setTimeout(()=> this.scroll(), 1000);
  }


 
  async scroll() {
    const objDiv: any = await document.getElementById('contentChat');
    objDiv.scrollTop = objDiv.scrollHeight;
  }


}
