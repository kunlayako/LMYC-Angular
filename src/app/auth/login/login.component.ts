import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { QuestionControlService } from '../../components/questions/question-control.service';
import { RegisterQuestionsService } from '../../components/questions/questionsService/registerQuestionsService.service';

import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: '../../components/dynamic-form-group/dynamic-form.component.html',
	styleUrls: ['../../components/dynamic-form-group/dynamic-form.component.css'],
	providers: [RegisterQuestionsService, QuestionControlService]
})

export class LoginComponent implements OnInit {

	form: FormGroup;
	questions: any[];

	formTitleText = "Login"
	formButtonText = "Login"
	errorMessage: string;

	constructor(
		private authService: AuthService,
		private router: Router,
		private qcs: QuestionControlService,
		private RegisterQuestionsService: RegisterQuestionsService
	) {
		this.questions = RegisterQuestionsService.getSignInQuestions();
	}

	ngOnInit() {
		this.form = this.qcs.toFormGroup(this.questions);
		this.titleTextString = "Please Login"
		this.buttonTextString = "Login"

		console.log('Sign in form loaded!');
	}

	save(form: any): boolean {
		if (!this.form.valid) {
			return false;
		}

		console.log(this.form.value)
		return true;
	}

	goToNext(form: any) {

	}

	buttonOnClick() {
		if (this.save(this.form)) {
			this.login();
		}
	}

	login() {
		this.authService.login(this.form.value.emailAddress, this.form.value.password, 'password')
			.subscribe(res => {
				this.router.navigate(['/']);
			}, error => {
				var results = error['_body'];
				this.errorMessage = error
			});
	}
}
