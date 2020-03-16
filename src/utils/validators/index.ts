type ValidatorReturnType = (value: string) => string | undefined;

export const required: ValidatorReturnType = value => !value ? 'Field is required' : undefined;
export const maxLength = (max: number): ValidatorReturnType => value => {
	return value && value.length > max ? `Must be ${max} characters or less` : undefined;
}; 