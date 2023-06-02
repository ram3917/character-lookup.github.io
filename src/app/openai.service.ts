import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from "openai";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OpenaiService {
  private openai: OpenAIApi;

  constructor()
  {
    const configuration = new Configuration({
      organization: environment.orgId,
      apiKey: environment.apiKey
    });

    this.openai = new OpenAIApi(configuration);
  }

  askAI(prompt: string): Promise<string | undefined>
  {
    return this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 7
        }).then(response => {
          return response.data.choices[0].text;
        }).catch(error=>{
          return '';
        });
  }
}
