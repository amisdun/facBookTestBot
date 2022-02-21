export class WebHookError extends Error {
	constructor(message, ErrorCode) {
		super(message);
		this.ErrorCode = ErrorCode;
	}
}
