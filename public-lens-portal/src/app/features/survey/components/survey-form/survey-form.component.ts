import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith, of } from 'rxjs';

import { FormDataService } from '../../services/form-data.service';
import { CookieService } from '../../services/cookie.service';
import { AnswerInfo, AnswerType, QuestionInfo, UserResponseInfo } from '../../../../shared/shared.module';

/** All 25 Sri Lankan districts (canonical spelling for submission). */
export const SL_DISTRICTS_ALL: readonly string[] = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
] as const;

function isValidSlDistrict(value: unknown): boolean {
  if (value == null || typeof value !== 'string') return false;
  const t = value.trim().toLowerCase();
  return SL_DISTRICTS_ALL.some((d) => d.toLowerCase() === t);
}

function slDistrictFromListValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = control.value;
    if (raw == null || String(raw).trim() === '') {
      return null;
    }
    return isValidSlDistrict(raw) ? null : { districtInvalid: true };
  };
}

@Component({
  selector: 'app-survey-form',
  standalone: false,
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.css'
})
export class SurveyFormComponent {

  form: FormGroup;
  formData: any;
  /** Set true on first submit attempt so validation messages and highlights show */
  submissionAttempted = false;

  /** Typeahead options for district mat-autocomplete */
  districtFilter$: Observable<string[]> = of([...SL_DISTRICTS_ALL]);

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.form = this.fb.group({
      demographics: this.fb.group({}),
      questions: this.fb.group({})
    });
  }

  ngOnInit(): void {
    this.formDataService.getFormData().subscribe((data: any) => {
      this.formData = data;
      this.buildForm(data);
    });
  }

  /** Validator: at least one checkbox must be selected */
  private atLeastOneSelected(control: AbstractControl): ValidationErrors | null {
    const arr = control as FormArray;
    const selected = arr.controls.some((c) => c.value === true);
    return selected ? null : { atLeastOneRequired: true };
  }

  buildForm(data: any): void {
    // User type: required. Email: required + email when type is Email
    this.form.addControl('userType', new FormControl('', Validators.required));
    const userEmailCtrl = new FormControl('');
    this.form.addControl('userEmail', userEmailCtrl);

    this.form.get('userType')?.valueChanges.subscribe((v) => {
      if (v === 'Email') {
        userEmailCtrl.setValidators([Validators.required, Validators.email]);
      } else {
        userEmailCtrl.setValidators(null);
      }
      userEmailCtrl.updateValueAndValidity();
    });

    const demographicsForm = this.form.get('demographics') as FormGroup;
    data.demographics.forEach((question: any) => {
      if (this.isDistrictQuestion(question)) {
        return;
      }
      if (question.type === 'checkbox') {
        const arr = this.fb.array(question.answers.map(() => false), this.atLeastOneSelected);
        demographicsForm.addControl(question.questionId, arr);
      } else {
        demographicsForm.addControl(question.questionId, new FormControl('', Validators.required));
      }
    });

    const districtQ = this.districtQuestionFromData(data);
    if (districtQ) {
      const districtCtrl = new FormControl<string>('', {
        validators: [Validators.required, slDistrictFromListValidator()],
        nonNullable: false,
      });
      demographicsForm.addControl(districtQ.questionId, districtCtrl);
      this.districtFilter$ = districtCtrl.valueChanges.pipe(
        startWith(districtCtrl.value ?? ''),
        map((v) => this.filterDistricts(typeof v === 'string' ? v : '')),
      );
    }

    const questionsForm = this.form.get('questions') as FormGroup;
    data.questions.forEach((question: any) => {
      if (question.type === 'checkbox') {
        const arr = this.fb.array(question.answers.map(() => false), this.atLeastOneSelected);
        questionsForm.addControl(question.questionId, arr);
      } else {
        questionsForm.addControl(question.questionId, new FormControl('', Validators.required));
      }
    });
  }

  /** Case-insensitive substring filter over all districts */
  private filterDistricts(query: string): string[] {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...SL_DISTRICTS_ALL];
    }
    return SL_DISTRICTS_ALL.filter((d) => d.toLowerCase().includes(q));
  }

  /**
   * Radio display order: keep API order but place every "No opinion" answer at the end
   * so stacked pills stay consistent (same width, last row is not a lone stray item).
   */
  orderedRadioAnswers(answers: any[] | null | undefined): any[] {
    if (!answers?.length) return [];
    const defer: any[] = [];
    const rest: any[] = [];
    for (const a of answers) {
      const t = String(a?.text ?? '').trim();
      if (/\bno opinion\b/i.test(t)) {
        defer.push(a);
      } else {
        rest.push(a);
      }
    }
    return [...rest, ...defer];
  }

  /** Whether to show validation error (invalid and touched/dirty or submission attempted) */
  showError(controlPath: string | (string | number)[]): boolean {
    const c = this.form.get(controlPath);
    return !!c && c.invalid && (c.touched || c.dirty || this.submissionAttempted);
  }

  /** Whether a control is invalid and should be highlighted (for red border) */
  controlInvalid(controlPath: string | (string | number)[]): boolean {
    const c = this.form.get(controlPath);
    return !!c && c.invalid && (c.touched || c.dirty || this.submissionAttempted);
  }

  /** Whether a section should show invalid styling (any of the given controls invalid) */
  isSectionInvalid(...paths: (string | (string | number)[])[]): boolean {
    return paths.some((p) => this.controlInvalid(p));
  }

  /** Mark all controls in a group (and nested groups/arrays) as touched */
  private markAllControlsTouched(group: AbstractControl): void {
    group.markAsTouched();
    if (group instanceof FormGroup) {
      Object.keys(group.controls).forEach((key) => this.markAllControlsTouched(group.get(key)!));
    } else if (group instanceof FormArray) {
      group.controls.forEach((c) => this.markAllControlsTouched(c));
    }
  }

  /** Get the id of the first invalid control for scroll-into-view */
  getFirstInvalidControlId(): string | null {
    const c = this.form.get('userType');
    if (c && c.invalid) return 'field-userType';
    if (this.form.get('userType')?.value === 'Email') {
      const email = this.form.get('userEmail');
      if (email && email.invalid) return 'field-userEmail';
    }
    const d = this.form.get('demographics') as FormGroup;
    if (d) {
      for (const key of Object.keys(d.controls)) {
        const child = d.get(key);
        if (child && child.invalid) return 'field-demographics-' + key;
      }
    }
    const q = this.form.get('questions') as FormGroup;
    if (q) {
      for (const key of Object.keys(q.controls)) {
        const child = q.get(key);
        if (child && child.invalid) return 'field-questions-' + key;
      }
    }
    return null;
  }

  /** Whether the email control has the given validation error */
  hasEmailError(errorCode: string): boolean {
    const c = this.form.get('userEmail');
    return c ? c.hasError(errorCode) : false;
  }

  getCheckboxControl(questionId: string, index: number, group: 'demographics' | 'questions' = 'demographics'): FormControl {
    const g = this.form.get(group) as FormGroup;
    const arr = g?.get(questionId) as FormArray;
    return arr ? arr.controls[index] as FormControl : this.fb.control(false);
  }

  getCheckboxOptions(controlName: string, group?: 'demographics' | 'questions'): FormArray {
    const g = group ? (this.form.get(group) as FormGroup) : this.form;
    return g?.get(controlName) as FormArray;
  }

  /** Demographics: Age group question (by text or id) */
  get ageGroupQuestion(): any {
    return this.formData?.demographics?.find(
      (q: any) =>
        q.questionId === 'q1' ||
        (q.text && (q.text.toLowerCase().includes('age') || q.text.toLowerCase().includes('age group')))
    );
  }

  /** Demographics: Gender question */
  get genderQuestion(): any {
    return this.formData?.demographics?.find(
      (q: any) =>
        q.questionId === 'q2' ||
        (q.text && q.text.toLowerCase().includes('gender'))
    );
  }

  /** Demographics: District question */
  get districtQuestion(): any {
    return this.formData?.demographics?.find((q: any) => this.isDistrictQuestion(q));
  }

  /** Other demographics (excluding age group, gender, and district — district has its own section) */
  get otherDemographics(): any[] {
    if (!this.formData?.demographics) return [];
    const age = this.ageGroupQuestion;
    const gender = this.genderQuestion;
    const district = this.districtQuestion;
    return this.formData.demographics.filter(
      (q: any) => q !== age && q !== gender && q !== district
    );
  }

  isDistrictQuestion(q: any): boolean {
    return (
      q?.questionId === 'q3' ||
      (q?.text && q.text.toLowerCase().includes('district'))
    );
  }

  private districtQuestionFromData(data: any): any | null {
    return data.demographics?.find((q: any) => this.isDistrictQuestion(q)) ?? null;
  }

  /** Progress 0–100 for completion indicator */
  get progressPercent(): number {
    if (!this.form) return 0;
    let filled = 0;
    let total = 0;
    const districtId = this.districtQuestion?.questionId;

    const count = (fg: FormGroup) => {
      Object.keys(fg.controls).forEach((key) => {
        const c = fg.get(key);
        if (!c) return;
        if (c instanceof FormControl) {
          total++;
          const v = c.value;
          if (districtId && key === districtId) {
            if (isValidSlDistrict(v)) filled++;
          } else if (v !== null && v !== undefined && v !== '') {
            filled++;
          }
          return;
        }
        if (c instanceof FormArray) {
          (c as FormArray).controls.forEach((ac) => {
            total++;
            if (ac.value) filled++;
          });
          return;
        }
        if (c instanceof FormGroup) count(c as FormGroup);
      });
    };
    total++;
    if (this.form.get('userType')?.value) filled++;
    if (this.form.get('userType')?.value === 'Email') {
      total++;
      if (this.form.get('userEmail')?.value) filled++;
    }
    const d = this.form.get('demographics') as FormGroup;
    const q = this.form.get('questions') as FormGroup;
    if (d) count(d);
    if (q) count(q);
    return total === 0 ? 0 : Math.min(100, Math.round((filled / total) * 100));
  }

  submitForm(): void {
    this.submissionAttempted = true;
    this.markAllControlsTouched(this.form);
    this.form.updateValueAndValidity();

    if (!this.form.valid) {
      const firstId = this.getFirstInvalidControlId();
      if (firstId) {
        setTimeout(() => {
          const el = document.getElementById(firstId);
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return;
    }

    const formValues = this.form.getRawValue();
    const userType = formValues['userType'];
    let userId: string;
    if (userType === 'ANONYMOUS') {
      userId = this.getAnonymousUserId();
    } else {
      userId = formValues['userEmail'];
    }
    this.doSubmission(userId);
  }

  private doSubmission(userId: string) {

    if (this.form.valid) {
      const formValues = this.form.getRawValue();
      const { demographics, questions } = formValues;

      const demographicAnswers = this.buildUserAnswers(demographics, AnswerType.DEMOGRAPHIC);
      const surveyAnswers = this.buildUserAnswers(questions, AnswerType.SURVEY);

      const surveyId = this.formData.id;
      const userResponsePayload: UserResponseInfo = {
        surveyId: surveyId,
        userId: userId,
        demographics: demographicAnswers,
        userAnswers: surveyAnswers
      };

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

  private buildUserAnswers(formValues: any, answerType: AnswerType): QuestionInfo[] {

    const userAnswers: QuestionInfo[] = [];
    const questionList = answerType === AnswerType.DEMOGRAPHIC ? this.formData.demographics : this.formData.questions;

    Object.keys(formValues).forEach(key => {

      const question = questionList.find((q: any) => q.questionId === key);
      if (!question) return;

      const answers: AnswerInfo[] = [];
      const value = formValues[key];

      if (question.type === 'checkbox' && Array.isArray(value)) {
        value.forEach((selected: boolean, i: number) => {
          if (selected && question.answers?.[i]) {
            answers.push({
              answerId: question.answers[i].answerId,
              text: question.answers[i].text
            });
          }
        });
      } else if (this.isDistrictQuestion(question) && typeof value === 'string' && value.trim() !== '') {
        answers.push(this.resolveDistrictAnswerPayload(value));
      } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        const answer: AnswerInfo = {
          answerId: value.answerId,
          text: value.text
        };
        answers.push(answer);
      } else if (typeof value === 'string' && value !== '') {
        const opt = question.answers?.find((a: any) => a.answerId === value);
        if (opt) {
          answers.push({ answerId: opt.answerId, text: opt.text });
        } else {
          answers.push({ answerId: value, text: value });
        }
      }

      if (answers.length > 0) {
        const userAnswer: QuestionInfo = {
          questionId: question.questionId,
          text: question.text,
          type: question.type,
          answers: answers
        };
        userAnswers.push(userAnswer);
      }
    });

    return userAnswers;
  }

  /** Map typed / selected district string to API answer or synthetic answer for submission */
  private resolveDistrictAnswerPayload(input: string): AnswerInfo {
    const canonical =
      SL_DISTRICTS_ALL.find((d) => d.toLowerCase() === input.trim().toLowerCase()) ?? input.trim();
    const dq = this.districtQuestion;
    const fromApi = dq?.answers?.find(
      (a: any) => (a.text || '').trim().toLowerCase() === canonical.toLowerCase()
    );
    if (fromApi) {
      return { answerId: fromApi.answerId, text: fromApi.text };
    }
    const slug = canonical
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');
    return { answerId: `q3_sl_${slug}`, text: canonical };
  }

  private getAnonymousUserId(): any {

    const COOKIE_KEY = 'anonymous-user-id';
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
