import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// Define a union type for the answer field
type Answer =
  | string // For TEXT, LIST, SCALE, RATING
  | string[] // For CHECKBOX, GRID, CHECKBOX_GRID
  | null; // For unanswered questions

export type SchemaDocument = HydratedDocument<Survey>;

@Schema()
export class Survey {
  @Prop({ required: true, unique: true }) // Generate UUID automatically
  uuid: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  timestamp: string;

  @Prop({
    type: [
      {
        question: { type: String, required: true },
        type: { type: String, required: true },
        answer: { type: mongoose.Schema.Types.Mixed, required: false }, // Use Mixed to allow different types
      },
    ],
    required: true,
    _id: false, // Prevents automatic creation of `_id` for sub-documents
  })
  responses: Array<{
    question: string;
    type: string;
    answer: Answer; // Use the defined union type
  }>;
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
