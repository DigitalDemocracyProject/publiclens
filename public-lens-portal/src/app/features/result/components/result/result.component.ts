import { Component } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  users = [
    { voting_behaviour: 'Voted for the ruling party', strongly_agree: '45%', agree: '30%', neutral: '10%', oppose: '10%', strongly_oppose: '5%' },
    { voting_behaviour: 'Voted for another party', strongly_agree: '30%', agree: '20%', neutral: '30%', oppose: '10%', strongly_oppose: '10%' },
    { voting_behaviour: 'Did not vote', strongly_agree: '40%', agree: '20%', neutral: '20%', oppose: '10%', strongly_oppose: '10%' },
    { voting_behaviour: 'Did not wish to disclose', strongly_agree: '50%', agree: '10%', neutral: '20%', oppose: '10%', strongly_oppose: '10%' }
  ];

  columns: string[] = ['voting-behaviour', 'strongly-agree', 'agree', 'neutral', 'oppose', 'strongly-oppose'];
}
