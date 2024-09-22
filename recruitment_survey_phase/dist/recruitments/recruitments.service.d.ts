import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
export declare class RecruitmentsService {
    create(createRecruitmentDto: CreateRecruitmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRecruitmentDto: UpdateRecruitmentDto): string;
    remove(id: number): string;
}
