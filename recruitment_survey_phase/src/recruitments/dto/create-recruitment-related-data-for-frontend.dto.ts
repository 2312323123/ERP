export class RecruitmentRelatedData {
  gradingInstruction: string;
  fieldsNotToShow: Array<string>;
  fieldToDistinctTheSurvey: string;
  evaluationCriteria: Array<{
    name: string;
    description: string;
    weight: number;
  }>;
  markTags: {
    mark1Tag: string;
    mark2Tag: string;
    mark3Tag: string;
    mark4Tag: string;
    mark5Tag: string;
  };
}

export class RecruitmentRelatedDataForEvaluation extends RecruitmentRelatedData {
  canEvaluateSurveys: boolean;
  canPeopleSeeRecruitment: boolean;
}

export class CreateRecruitmentRelatedDataForFrontendDto extends RecruitmentRelatedData {
  isThereAnyMark: boolean;
  isThereAnySurvey: boolean;
  token: string;
}
