import { CreateActiveRecruitmentDto } from './dto/create-active_recruitment.dto';
import { UpdateActiveRecruitmentDto } from './dto/update-active_recruitment.dto';
export declare class ActiveRecruitmentsService {
    create(createActiveRecruitmentDto: CreateActiveRecruitmentDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateActiveRecruitmentDto: UpdateActiveRecruitmentDto): string;
    remove(id: number): string;
}
