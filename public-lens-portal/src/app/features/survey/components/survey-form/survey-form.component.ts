import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormDataService } from '../../services/form-data.service';
import { CookieService } from '../../services/cookie.service';
import { AnswerInfo, QuestionInfo, UserResponseInfo } from '../../../../shared/shared.module';

@Component({
  selector: 'app-survey-form',
  standalone: false,
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css'
})
export class SurveyFormComponent {

  form: FormGroup;
  formData: any;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.formDataService.getFormData().subscribe((data: any) => {
      this.formData = data;
      this.buildForm(data);
    });
  }

  buildForm(data: any): void {
    // Add user type controls outside the loop
    this.form.addControl('userType', new FormControl(''));
    this.form.addControl('userEmail', new FormControl(''));

    data.questions.forEach((question: any) => {
      // Dynamic form controls
      if (question.type === 'checkbox') {
        this.form.addControl(
          question.questionId,
          this.fb.array(question.answers.map(() => false))
        );
      } else {
        this.form.addControl(question.questionId, new FormControl(''));
      }
    });
  }

  getCheckboxControl(questionId: string, index: number): FormControl {
    return this.getCheckboxOptions(questionId).controls[index] as FormControl;
  }

  getCheckboxOptions(controlName: string): FormArray {
    return this.form.get(controlName) as FormArray;
  }  

  submitForm(): void {
    const formValues = this.form.value;
    const userType = formValues['userType'];

    let userId;
    if (userType == 'ANONYMOUS') {
      userId = this.getAnonymousUserId();
    } else {
      userId = formValues['userEmail'];
    }
    this.doSubmision(userId);
  }

  private doSubmision(userId: string) {

    if (this.form.valid) {
      const formValues = this.form.value;

      // Exclude non-survey controls
      const excludedKeys = ['userType', 'userEmail'];

      // Build the user answers
      const userAnswers: QuestionInfo[] = [];
      Object.keys(formValues).forEach(key => {
        if (!excludedKeys.includes(key)) {

          // Build the selected answer(s)
          const answers: AnswerInfo[] = [];

          const value = formValues[key];
          if (value !== null && typeof value === 'object') { // Single answer
            const answer: AnswerInfo = {
              answerId: value.answerId,
              text: value.text
            };
            answers.push(answer);
          }
          
          const question = this.formData.questions.find((question: any) => question.questionId === key);
          if (question) {
            const userAnswer: QuestionInfo = {
              questionId: question.questionId,
              text: question.text,
              type: question.type,
              answers: answers
            };
            userAnswers.push(userAnswer);
          }
        }
      });

      // Build the user response payload
      const surveyId = this.formData.id;
      const userResponsePayload: UserResponseInfo = {
          surveyId: surveyId,
          userId: userId,
          demographics: [],
          userAnswers: userAnswers
      };

      // Submit the response to the service
      this.formDataService.submitResponses(userResponsePayload).subscribe({
        next: () => {
          this.router.navigate(['/success']);
        },
        error: (error: any) => {
          console.error('Error submitting responses: ', error);
          alert('There was an error submitting the survey!');
        }
      });
    }
  }

  private getAnonymousUserId(): any {

    const COOKIE_KEY = 'annonymous-user-id';
    let cookieId = this.cookieService.getCookie(COOKIE_KEY);
    if (!cookieId) {
      cookieId = this.generateUniqueId();
      this.cookieService.setCookie(COOKIE_KEY, cookieId, 365); // Set cookie for 1 year
    }

    return cookieId;
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
