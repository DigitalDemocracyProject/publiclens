import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormDataService } from '../../services/form-data.service';
import { CookieService } from '../../services/cookie.service';

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

    data.questionInfos.forEach((question: any) => {
      // Dynamic form controls
      if (question.type === 'checkbox') {
        this.form.addControl(
          question.questionId,
          this.fb.array(question.answerInfos.map(() => false))
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
      const surveyId = 'S001'; // Hardcoded Survey Id
      const submittedDate = new Date(); // Current submission date

      // Build the user answers list
      const userAnswers = Object.keys(formValues)
        .filter((key) => key !== 'userEmail') // Exclude the email field from user answers
        .map((key) => {
          const value = formValues[key];
          if (Array.isArray(value)) {
            return {
              questionId: key,
              answerId: value
                .map((selected, index) =>
                  selected
                    ? this.formData.questionInfos.find((q: any) => q.questionId === key).answerInfos[index].answerId
                    : null
                )
                .filter((option) => option !== null)
                .join(",")
            };
          } else {
            return {
              questionId: key,
              answerId: value
            };
          }
        });

      // Build the final response payload
      const responsePayload = [
        {
          responseId: null, // Can be null or omitted for new submissions
          surveyId: surveyId,
          userId: userId, // Include the email address (even if empty)
          submittedDate: submittedDate,
          userAnswers: userAnswers
        },
      ];

      // Submit the response payload to the API
      this.formDataService.submitResponses(responsePayload).subscribe(
        (response: any) => {
          console.log('Responses submitted successfully: ', response);
          this.router.navigate(['/success']); // Navigate to the success page
        },
        (error: any) => {
          console.error('Error submitting responses: ', error);
          alert('There was an error submitting the survey.');
        }
      );
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
