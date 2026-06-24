# Validation response

from pydantic import BaseModel, computed_field


class ValidationResult(BaseModel):

	correctness_score: float

	feedback: str

	tone_score: float


	@computed_field
	@property
	def score(self) -> float:
		return (self.tone_score + self.correctness_score) / 2

	
	@computed_field
	@property
	def passed(self) -> bool:
		return self.score >= 0.85


class ValidationError(Exception):

	def __init__(self, result: ValidationResult):
		self.result = result

		super().__init__(
			f"Validation failed "
			f"(score={result.score:.3f})"
			f"(tone={result.tone_score:.3f})"
			f"(correctness={result.correctness_score:.3f})"
			f"{result.feedback}"
		)
