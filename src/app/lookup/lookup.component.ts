import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OpenaiService } from '../openai.service';
import { ansiRegex } from 'ansi-colors';

@Component({
  selector: 'lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})

export class LookupComponent
{
  answer: string ="He was the one who..."

  constructor(private openaiService: OpenaiService) {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    console.log(f.value)

    let question = "Tell me about the character" +
    f.value.characterName + " from " + f.value.bookName + " in 150 words"

    this.openaiService.askAI(question).then(
      (reponse) => {
        this.answer = reponse!
        if (this.answer==="")
        {
          this.answer = "You are out of your ChatGPT Query tokens!"
        }
        console.log("Answer is " + this.answer)
      }
    )
  }
}
