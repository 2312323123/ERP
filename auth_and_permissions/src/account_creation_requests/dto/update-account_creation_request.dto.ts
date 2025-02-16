import { PartialType } from '@nestjs/swagger';
import { CreateAccountCreationRequestDto } from './create-account_creation_request.dto';

export class UpdateAccountCreationRequestDto extends PartialType(CreateAccountCreationRequestDto) {}
